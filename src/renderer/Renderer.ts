/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { GraphimNode, RenderSetting } from '../filter/GraphimNode';
import { bindTexture, copyElementAttributes } from '../utils';

interface RendererParameter {
  image: HTMLImageElement;
}

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

  private canvasID: string;

  constructor({ image }: RendererParameter) {
    this.originalImage = image;

    this.image = image;

    this.canvas = document.createElement('canvas');
    copyElementAttributes(this.canvas, image);
    this.canvasID = uuidv4();

    image.after(this.canvas);
    image.style.display = 'none';

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

  public render(filters: GraphimNode, time = 0) {
    const renderData: RenderSetting = {
      inputTexture: this.imageTexture,
      renderID: uuidv4(),
      canvasID: this.canvasID,
      renderToCanvas: true,
      time,
      mouse: this.mouse,
      isHover: this.isHover,
      gl: this.gl,
    }

    filters.render(renderData);
  }

  public animate(filters: GraphimNode) {
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
