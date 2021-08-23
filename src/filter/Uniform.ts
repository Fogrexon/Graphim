class Uniform {
  private valueMap = new Map();

  private flipYLocation: WebGLUniformLocation = -1;

  public init(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.flipYLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'flipY');
  }

  public render(gl: WebGLRenderingContext, renderToCanvas: boolean) {
    gl.uniform1f(this.flipYLocation, renderToCanvas ? -1 : 1);
  }
}

export { Uniform };
