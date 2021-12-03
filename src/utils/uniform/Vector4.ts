import { Uniform } from './Uniform';

/**
 * Uniform variables for Vector4(vec4)
 * @exports
 * @class Vector4
 * @implements {Uniform}
 */
class Vector4 implements Uniform {
  /**
   * x value
   *
   * @type {number}
   * @memberof Vector4
   */
  public x: number;

  /**
   * y value
   *
   * @type {number}
   * @memberof Vector4
   */
  public y: number;

  /**
   * z value
   *
   * @type {number}
   * @memberof Vector4
   */
  public z: number;

  /**
   * w value
   *
   * @type {number}
   * @memberof Vector4
   */
  public w: number;

  /**
   * Creates an instance of Vector4.
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @param {number} [w=0]
   * @memberof Vector4
   */
  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * set each value
   *
   * @param {(number | Vector4)} x
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @param {number} [w=0]
   * @memberof Vector4
   */
  public set(x: number | Vector4, y: number = 0, z: number = 0, w: number = 0) {
    if (x instanceof Vector4) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }
  }

  /**
   * return length^2
   *
   * @return {*}  {number}
   * @memberof Vector4
   */
  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0 + this.z ** 2.0 + this.w ** 2.0;
  }

  /**
   * return length
   *
   * @return {*}  {number}
   * @memberof Vector4
   */
  public length(): number {
    return Math.sqrt(this.length2());
  }

  /**
   * return euclidean distance
   *
   * @param {Vector4} a
   * @return {*}  {number}
   * @memberof Vector4
   */
  public distance(a: Vector4): number {
    return Math.sqrt(
      (this.x - a.x) ** 2 + (this.y - a.y) ** 2 + (this.z - a.z) ** 2 + (this.w - a.w) ** 2
    );
  }

  /**
   * add each value
   *
   * @param {(Vector4 | number)} a
   * @memberof Vector4
   */
  public add(a: Vector4 | number) {
    if (a instanceof Vector4) {
      this.x += a.x;
      this.y += a.y;
      this.z += a.z;
      this.w += a.w;
    } else {
      this.x += a;
      this.y += a;
      this.z += a;
      this.w += a;
    }
  }

  /**
   * subtract each value
   *
   * @param {(Vector4 | number)} a
   * @memberof Vector4
   */
  public subtract(a: Vector4 | number) {
    if (a instanceof Vector4) {
      this.x -= a.x;
      this.y -= a.y;
      this.z -= a.z;
      this.w -= a.w;
    } else {
      this.x -= a;
      this.y -= a;
      this.z -= a;
      this.w -= a;
    }
  }

  /**
   * multiply each value
   *
   * @param {(Vector4 | number)} a
   * @memberof Vector4
   */
  public multiply(a: Vector4 | number) {
    if (a instanceof Vector4) {
      this.x *= a.x;
      this.y *= a.y;
      this.z *= a.z;
      this.w *= a.w;
    } else {
      this.x *= a;
      this.y *= a;
      this.z *= a;
      this.w *= a;
    }
  }

  /**
   * divide each value
   * if you try to divide with 0, throw error
   *
   * @param {(Vector4 | number)} a
   * @memberof Vector4
   */
  public divide(a: Vector4 | number) {
    if (a instanceof Vector4) {
      console.assert(a.x !== 0 && a.y !== 0 && a.z !== 0 && a.w !== 0);
      this.x /= a.x;
      this.y /= a.y;
      this.z /= a.z;
      this.w /= a.w;
    } else {
      console.assert(a !== 0);
      this.x /= a;
      this.y /= a;
      this.z /= a;
      this.w /= a;
    }
  }

  /**
   * normalize
   *
   * @memberof Vector4
   */
  public normalize() {
    this.divide(this.length());
  }

  /**
   * dot
   *
   * @param {Vector4} a
   * @return {*}  {number}
   * @memberof Vector4
   */
  public dot(a: Vector4): number {
    return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
  }

  /**
   * evaluate if each value is equal with a
   *
   * @param {Vector4} a
   * @return {*}  {boolean}
   * @memberof Vector4
   */
  public equal(a: Vector4): boolean {
    return this.x === a.x && this.y === a.y && this.z === a.z && this.w === a.w;
  }

  /**
   * clone variable (create new instance)
   *
   * @return {*}  {Vector4}
   * @memberof Vector4
   */
  public clone(): Vector4 {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  /**
   * get values as float32array
   *
   * @return {*}  {Float32Array}
   * @memberof Vector4
   */
  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z, this.w]);
  }

  /**
   * set variables to webgl program
   *
   * @param {WebGLRenderingContext} gl
   * @param {WebGLUniformLocation} location
   * @memberof Vector4
   */
  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform4fv(location, this.getArray());
  }
}

export { Vector4 };
