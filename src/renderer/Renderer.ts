import { Filter } from '../filter/Filter';

interface RendererParameter{
  image: HTMLImageElement;
}

const bindTexture = (
  gl: WebGLRenderingContext,
  texture: WebGLTexture,
  image: HTMLImageElement,
) => {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.bindTexture(gl.TEXTURE_2D, null);
};

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
    // image.parentElement?.removeChild(image);

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
    bindTexture(gl, this.imageTexture, this.image);
    this.filters = filters;
    this.filters.forEach((filter) => {
      filter.init(this.gl, this.canvas.width, this.canvas.height);
    });
  }

  public render() {
    let texture = this.imageTexture;

    this.filters.forEach((filter, index) => {
      filter.render({
        targetTexture: <WebGLTexture>texture,
        renderToCanvas: index === this.filters.length - 1,
      });
      texture = filter.getRenderTexture();
    });
  }
}

export { Renderer };
