import { Uniform } from './Uniform';

class Int implements Uniform {
  public x: number;

  constructor(x: number = 0) {
    this.x = x;
  }

  public set(x: number): void {
    this.x = x;
  }

  public equal(a: Int): boolean {
    return this.x === a.x;
  }

  public clone(): Int {
    return new Int(this.x);
  }

  public copy(a: Int) {
    this.x = a.x;
  }

  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform1i(location, this.x);
  }
}

export { Int };
