import { Uniform } from './Uniform';

class Color implements Uniform {
  public r: number;

  public g: number;

  public b: number;

  public a: number;

  constructor(r = 0, g = 0, b = 0, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform4fv(location, new Float32Array([this.r, this.g, this.b, this.a]));
  }

  public set(r: number, g: number, b: number, a: number = this.a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

export { Color };
