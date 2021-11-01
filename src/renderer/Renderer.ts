/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
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

const copyElementAttributes = (
  a: HTMLImageElement | HTMLCanvasElement,
  b: HTMLImageElement | HTMLCanvasElement
) => {
  a.width = b.width;
  a.height = b.height;
  b.classList.forEach((className) => {
    a.classList.add(className);
  });
  a.id = b.id;
  Object.entries(b.style).forEach(([key, value]) => {
    a.style.setProperty(key, value);
  });
  Object.entries(b.dataset).forEach(([key, value]) => {
    a.setAttribute(`data-${key}`, <string>value);
  });
};

class Renderer {
  private originalImage: HTMLImageElement;

  private image: HTMLImageElement;

  private canvas: HTMLCanvasElement;

  private gl: WebGLRenderingContext;

  private imageTexture: WebGLTexture;

  private isAnimation: boolean = false;

  private accTime: number = 0;

  private mouse: [number, number] = [0, 0];

  private isHover: boolean = false;

  private uuid: string;

  constructor({ image }: RendererParameter) {
    this.originalImage = image;

    this.image = image;

    this.canvas = document.createElement('canvas');
    copyElementAttributes(this.canvas, image);
    image.after(this.canvas);
    image.style.display = 'none';
    this.uuid = uuidv4();

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

    this.isAnimation = false;

    this.imageTexture = <WebGLTexture>this.gl.createTexture();
    bindTexture(this.gl, this.imageTexture, this.image);
  }

  private handlePointer(e: MouseEvent | TouchEvent) {
    if (e instanceof TouchEvent) {
      const rect = (<HTMLElement>e.target).getBoundingClientRect();
      this.mouse = [
        (e.touches[0].clientX - window.pageXOffset - rect.left) / this.canvas.width,
        (e.touches[0].clientX - window.pageXOffset - rect.left) / this.canvas.height,
      ];
    } else {
      this.mouse = [e.offsetX / this.canvas.width, e.offsetY / this.canvas.height];
    }
  }

  public setImage(image: HTMLImageElement) {
    this.image = image;
    this.originalImage.src = image.src;
    this.originalImage.width = image.width;
    this.originalImage.height = image.height;
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    bindTexture(this.gl, this.imageTexture, this.image);
  }

  public release() {
    this.gl.deleteTexture(this.imageTexture);
    this.image.style.removeProperty('display');
    this.canvas.remove();
  }

  public render(filters: Filter[], time = 0) {
    let texture = this.imageTexture;

    filters.forEach((filter, index) => {
      if (this.uuid !== filter.getInitializedUUID()) {
        filter.release();
        filter.init(this.gl, this.uuid);
      }
      filter.render({
        targetTexture: <WebGLTexture>texture,
        renderToCanvas: index === filters.length - 1,
        time,
        mouse: this.mouse,
        isHover: this.isHover,
      });
      texture = filter.getRenderTexture() || texture;
    });
  }

  public animate(filters: Filter[]) {
    let start = new Date().getTime() / 1000;
    this.isAnimation = true;

    const tick = () => {
      if (!this.isAnimation) return;
      const now = new Date().getTime() / 1000;
      this.accTime += now - start;
      start = now;

      this.render(filters, this.accTime);
      requestAnimationFrame(tick);
    };
    tick();
  }

  public stopAnimate() {
    this.isAnimation = false;
  }
}

export { Renderer };
