/* eslint-disable no-unused-vars */
/**
 * the base class of Uniform
 * 
 * @exports
 * @interface Uniform
 */
interface Uniform {
  set(...v: any[]): void;
  setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation): void;
}

export { Uniform };
