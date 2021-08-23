class Uniform {
  private valueMap = new Map();

  private flipYLocation: WebGLUniformLocation = -1;

  private timeLocation: WebGLUniformLocation = -1;

  public init(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.flipYLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'flipY');
    this.timeLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'time');
  }

  public render(gl: WebGLRenderingContext, renderToCanvas: boolean, time?: number) {
    gl.uniform1f(this.flipYLocation, renderToCanvas ? -1 : 1);
    gl.uniform1f(this.timeLocation, time || 0);
  }
}

export { Uniform };
