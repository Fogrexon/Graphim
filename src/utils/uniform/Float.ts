import { Uniform } from './Uniform';

class Float implements Uniform {
  public x: number;

  constructor(x: number = 0) {
    this.x = x;
  }

  public set(x: number): void {
    this.x = x;
  }

  public equal(a: Float): boolean {
    return this.x === a.x;
  }

  public clone(): Float {
    return new Float(this.x);
  }

  public copy(a: Float) {
    this.x = a.x;
  }

  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform1f(location, this.x);
  }
}

export { Float };
