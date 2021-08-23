/* eslint-disable no-unused-vars */
interface Uniform {
  set(...v: any[]): void;
  setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation): void;
}

export { Uniform };
