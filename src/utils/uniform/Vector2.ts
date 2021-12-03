import { Uniform } from './Uniform';

/**
 * Uniform variables for vector2(vec2)
 *
 * @exports
 * @class Vector2
 * @implements {Uniform}
 */
class Vector2 implements Uniform {
  /**
   * x value
   *
   * @type {number}
   * @memberof Vector2
   */
  public x: number;

  /**
   * y value
   *
   * @type {number}
   * @memberof Vector2
   */
  public y: number;

  /**
   * Creates an instance of Vector2.
   * default value is 0
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @memberof Vector2
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * set each value
   * if you pass Vector2 instance, copy value
   *
   * @param {(number | Vector2)} x
   * @param {number} [y=0]
   * @memberof Vector2
   */
  public set(x: number | Vector2, y: number = 0) {
    if (x instanceof Vector2) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  /**
   * return length^2
   *
   * @return {*}  {number}
   * @memberof Vector2
   */
  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0;
  }

  /**
   * return length
   *
   * @return {*}  {number}
   * @memberof Vector2
   */
  public length(): number {
    return Math.sqrt(this.length2());
  }

  /**
   * return euclidean distance
   *
   * @param {Vector2} a
   * @return {*}  {number}
   * @memberof Vector2
   */
  public distance(a: Vector2): number {
    return Math.sqrt((this.x - a.x) ** 2 + (this.y - a.y) ** 2);
  }

  /**
   * add each value
   *
   * @param {(Vector2 | number)} a
   * @memberof Vector2
   */
  public add(a: Vector2 | number) {
    if (a instanceof Vector2) {
      this.x += a.x;
      this.y += a.y;
    } else {
      this.x += a;
      this.y += a;
    }
  }

  /**
   * subtract each value
   *
   * @param {(Vector2 | number)} a
   * @memberof Vector2
   */
  public subtract(a: Vector2 | number) {
    if (a instanceof Vector2) {
      this.x -= a.x;
      this.y -= a.y;
    } else {
      this.x -= a;
      this.y -= a;
    }
  }

  /**
   * multiply each value
   *
   * @param {(Vector2 | number)} a
   * @memberof Vector2
   */
  public multiply(a: Vector2 | number) {
    if (a instanceof Vector2) {
      this.x *= a.x;
      this.y *= a.y;
    } else {
      this.x *= a;
      this.y *= a;
    }
  }

  /**
   * divide each value
   * if you try to divide by 0, throw error
   *
   * @param {(Vector2 | number)} a
   * @memberof Vector2
   */
  public divide(a: Vector2 | number) {
    if (a instanceof Vector2) {
      console.assert(a.x !== 0 && a.y !== 0);
      this.x /= a.x;
      this.y /= a.y;
    } else {
      console.assert(a !== 0);
      this.x /= a;
      this.y /= a;
    }
  }

  /**
   * normalize vector
   *
   * @memberof Vector2
   */
  public normalize() {
    this.divide(this.length());
  }

  /**
   * dot values
   *
   * @param {Vector2} a
   * @return {*}  {number}
   * @memberof Vector2
   */
  public dot(a: Vector2): number {
    return this.x * a.x + this.y * a.y;
  }

  /**
   * evaluate if each value is equal with a
   *
   * @param {Vector2} a
   * @return {*}  {boolean}
   * @memberof Vector2
   */
  public equal(a: Vector2): boolean {
    return this.x === a.x && this.y === a.y;
  }

  /**
   * clone variable (create new instance)
   *
   * @return {*}  {Vector2}
   * @memberof Vector2
   */
  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * copy each value from a
   *
   * @param {Vector2} a
   * @memberof Vector2
   */
  public copy(a: Vector2) {
    this.x = a.x;
    this.y = a.y;
  }

  /**
   * get values as float32array
   *
   * @return {*}  {Float32Array}
   * @memberof Vector2
   */
  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y]);
  }

  /**
   * set value to webgl program
   *
   * @param {WebGLRenderingContext} gl
   * @param {WebGLUniformLocation} location
   * @memberof Vector2
   */
  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform2fv(location, this.getArray());
  }
}

export { Vector2 };
