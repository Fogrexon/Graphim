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
    this.copyElementAttributes();
    image.parentElement?.appendChild(this.canvas);
    image.parentElement?.removeChild(image);

    this.gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
  }
  
  // copy image attrib to canvas
  private copyElementAttributes() {
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.image.classList.forEach(className => {
      this.canvas.classList.add(className);
    });
    this.canvas.id = this.image.id;
    for (let key in this.image.style) {
      this.canvas.style[key] = this.image.style[key];
    }
    for (let key in this.image.dataset) {
      this.canvas.dataset[key] = this.image.dataset[key];
    }

  }

  public render() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);

    
  };
}

export { Renderer };
