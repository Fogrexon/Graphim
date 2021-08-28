import { Filter } from '../filter/Filter';

interface RendererParameter {
  image: HTMLImageElement;
}

const bindTexture = (gl: WebGLRenderingContext, texture: WebGLTexture, image: HTMLImageElement) => {
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

  private isAnimation: boolean = false;

  private accTime: number = 0;

  private mouse: [number, number] = [0, 0];

  private isHover: boolean = false;

  constructor({ image }: RendererParameter) {
    this.image = image;

    this.canvas = document.createElement('canvas');
    this.copyElementAttributes();
    image.parentElement?.appendChild(this.canvas);
    image.parentElement?.removeChild(image);

    // mouse event
    this.canvas.addEventListener('mouseenter', (e) => {
      this.isHover = true;
      this.handlePointer(e);
    });
    this.canvas.addEventListener('mousemove', (e) => {
      this.handlePointer(e);
    });
    this.canvas.addEventListener('mouseleave', (e) => {
      this.isHover = false;
      this.handlePointer(e);
    });

    // touch event
    this.canvas.addEventListener('touchstart', (e) => {
      this.isHover = true;
      this.handlePointer(e);
    });
    this.canvas.addEventListener('touchmove', (e) => {
      this.handlePointer(e);
    });
    this.canvas.addEventListener('touchend', (e) => {
      this.isHover = false;
      this.handlePointer(e);
    });

    this.gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
    this.filters = [];

    this.isAnimation = false;
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

  private handlePointer(e: MouseEvent | TouchEvent) {
    if (e instanceof TouchEvent) {
      const rect = (<HTMLElement>e.target).getBoundingClientRect();
      this.mouse = [(e.touches[0].clientX - window.pageXOffset - rect.left) / this.canvas.width,
      (e.touches[0].clientX - window.pageXOffset - rect.left) / this.canvas.height];
    } else {
      this.mouse = [e.offsetX / this.canvas.width, e.offsetY / this.canvas.height];
    }
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

  public render(time = 0) {
    let texture = this.imageTexture;

    this.filters.forEach((filter, index) => {
      filter.render({
        targetTexture: <WebGLTexture>texture,
        renderToCanvas: index === this.filters.length - 1,
        time,
        mouse: this.mouse,
        isHover: this.isHover,
      });
      texture = filter.getRenderTexture();
    });
  }

  public animate() {
    let start = new Date().getTime() / 1000;
    this.isAnimation = true;

    const tick = () => {
      const now = new Date().getTime() / 1000;
      this.accTime += now - start;
      start = now;

      this.render(this.accTime);
      if (this.isAnimation) requestAnimationFrame(tick);
    };
    tick();
  }

  public stopAnimate() {
    this.isAnimation = false;
  }
}

export { Renderer };
