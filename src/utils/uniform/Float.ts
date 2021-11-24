import { Uniform } from './Uniform';

/**
 * Uniform variables for float
 *
 * @exports
 * @class Float
 * @implements {Uniform}
 */
class Float implements Uniform {
  /**
   * float value
   *
   * @type {number}
   * @memberof Float
   */
  public x: number;

  /**
   * Creates an instance of Float.
   * @param {number} [x=0]
   * @memberof Float
   */
  constructor(x: number = 0) {
    this.x = x;
  }

  /**
   * set variable
   *
   * @param {number} x
   * @memberof Float
   */
  public set(x: number): void {
    this.x = x;
  }

  /**
   * evaluate if this and a are equal.
   *
   * @param {Float} a
   * @return {*}  {boolean}
   * @memberof Float
   */
  public equal(a: Float): boolean {
    return this.x === a.x;
  }

  /**
   * clone variable (create new instance)
   *
   * @return {*}  {Float}
   * @memberof Float
   */
  public clone(): Float {
    return new Float(this.x);
  }

  /**
   * copy value of a
   *
   * @param {Float} a
   * @memberof Float
   */
  public copy(a: Float) {
    this.x = a.x;
  }

  /**
   * set value to webgl program
   *
   * @param {WebGLRenderingContext} gl
   * @param {WebGLUniformLocation} location
   * @memberof Float
   */
  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform1f(location, this.x);
  }
}

export { Float };
