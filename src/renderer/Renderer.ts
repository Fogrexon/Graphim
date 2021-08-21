interface RendererParameter{
  image: HTMLImageElement;
}

class Renderer {
  private image: HTMLImageElement;

  private canvas: HTMLCanvasElement;

  private gl: WebGLRenderingContext;

  constructor({ image }: RendererParameter) {
    this.image = image;
    this.canvas = document.createElement('canvas');
    image.parentElement?.appendChild(this.canvas);
  }

  public render();
}

export { Renderer };
