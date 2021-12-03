import { Uniform } from './Uniform';

/**
 * Uniform variables for Color(vec4)
 *
 * @exports
 * @class Color
 * @implements {Uniform}
 */
class Color implements Uniform {
  /**
   * red value (0-1)
   *
   * @type {number}
   * @memberof Color
   */
  public r: number;

  /**
   * green value (0-1)
   *
   * @type {number}
   * @memberof Color
   */
  public g: number;

  /**
   * blue value (0-1)
   *
   * @type {number}
   * @memberof Color
   */
  public b: number;

  /**
   * alpha value (0-1)
   *
   * @type {number}
   * @memberof Color
   */
  public a: number;

  /**
   * Creates an instance of Color.
   * @param {number} [r=0]
   * @param {number} [g=0]
   * @param {number} [b=0]
   * @param {number} [a=1]
   * @memberof Color
   */
  constructor(r = 0, g = 0, b = 0, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * To string (css style)
   * rbga(0-255, 0-255, 0-255, 0-1)
   *
   * @return {*} 
   * @memberof Color
   */
  public toString() {
    return `rgba(${Math.floor(this.r)}, ${Math.floor(this.g)}, ${Math.floor(this.b)}, ${this.a})`;
  }

  /**
   * set value to webgl program
   *
   * @param {WebGLRenderingContext} gl
   * @param {WebGLUniformLocation} location
   * @memberof Color
   */
  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform4fv(location, new Float32Array([this.r, this.g, this.b, this.a]));
  }

  /**
   * set each value
   *
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} [a=this.a]
   * @memberof Color
   */
  public set(r: number, g: number, b: number, a: number = this.a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

export { Color };
