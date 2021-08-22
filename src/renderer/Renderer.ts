import { Filter } from '../filter/Filter';

interface RendererParameter{
  image: HTMLImageElement;
}

class Renderer {
  private image: HTMLImageElement;

  private canvas: HTMLCanvasElement;

  private gl: WebGLRenderingContext;

  private filters: Filter[];

  private imageTexture: WebGLTexture | null = null;

  constructor({ image }: RendererParameter) {
    this.image = image;

    this.canvas = document.createElement('canvas');
    this.copyElementAttributes();
    image.parentElement?.appendChild(this.canvas);
    image.parentElement?.removeChild(image);

    this.gl = <WebGLRenderingContext> this.canvas.getContext('webgl');
    this.filters = [];
  }

  // copy image attrib to canvas
  private copyElementAttributes() {
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.image.classList.forEach((className) => {
      this.canvas.classList.add(className);
    });
    this.canvas.id = this.image.id;
    Object.entries(this.image.style).forEach(([key, value]) => {
      this.canvas.style.setProperty(key, value);
    });
    Object.entries(this.image.dataset).forEach(([key, value]) => {
      this.canvas.setAttribute(`data-${key}`, <string>value);
    });
  }

  public init(filters: Filter[]) {
    const { gl } = this;
    this.imageTexture = <WebGLTexture>gl.createTexture();
    this.filters = filters;
    this.filters.forEach((filter) => {
      filter.init(this.gl, this.canvas.width, this.canvas.height);
    });
  }

  public render() {
    const { gl } = this;

    let texture = this.imageTexture;

    this.filters.forEach((filter, index) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
      filter.render({
        targetTexture: <WebGLTexture>texture,
        renderToCanvas: index === this.filters.length - 1,
      });
      texture = filter.getRenderTexture();
    });
  }
}

export { Renderer };
