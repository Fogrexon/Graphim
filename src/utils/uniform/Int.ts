import { Uniform } from './Uniform';

/**
 * Uniform varriables for int
 *
 * @exports
 * @class Int
 * @implements {Uniform}
 */
class Int implements Uniform {
  public x: number;

  /**
   * Creates an instance of Int.
   * @param {number} [x=0]
   * @memberof Int
   */
  constructor(x: number = 0) {
    this.x = x;
  }

  /**
   * set value
   *
   * @param {number} x
   * @memberof Int
   */
  public set(x: number): void {
    this.x = x;
  }

  /**
   * evaluate if this and a are equal
   *
   * @param {Int} a
   * @return {*}  {boolean}
   * @memberof Int
   */
  public equal(a: Int): boolean {
    return this.x === a.x;
  }

  /**
   * clone variable (create new instance)
   *
   * @return {*}  {Int}
   * @memberof Int
   */
  public clone(): Int {
    return new Int(this.x);
  }

  /**
   * copy value of a
   *
   * @param {Int} a
   * @memberof Int
   */
  public copy(a: Int) {
    this.x = a.x;
  }

  /**
   * set value to webgl program
   *
   * @param {WebGLRenderingContext} gl
   * @param {WebGLUniformLocation} location
   * @memberof Int
   */
  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform1i(location, this.x);
  }
}

export { Int };
