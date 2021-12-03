import { Uniform } from './Uniform';

/**
 * Uniform variables for Vector3(vec3)
 *
 * @exports
 * @class Vector3
 * @implements {Uniform}
 */
class Vector3 implements Uniform {
  /**
   * x value
   *
   * @type {number}
   * @memberof Vector3
   */
  public x: number;

  /**
   * y value
   *
   * @type {number}
   * @memberof Vector3
   */
  public y: number;

  /**
   * z value
   *
   * @type {number}
   * @memberof Vector3
   */
  public z: number;

  /**
   * Creates an instance of Vector3.
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @memberof Vector3
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * set values
   * default value is 0
   *
   * @param {(number | Vector3)} x
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @memberof Vector3
   */
  public set(x: number | Vector3, y: number = 0, z: number = 0) {
    if (x instanceof Vector3) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  /**
   * return length^2
   *
   * @return {*}  {number}
   * @memberof Vector3
   */
  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0 + this.z ** 2.0;
  }

  /**
   * return length
   *
   * @return {*}  {number}
   * @memberof Vector3
   */
  public length(): number {
    return Math.sqrt(this.length2());
  }

  /**
   * return euclidean distance
   *
   * @param {Vector3} a
   * @return {*}  {number}
   * @memberof Vector3
   */
  public distance(a: Vector3): number {
    return Math.sqrt((this.x - a.x) ** 2 + (this.y - a.y) ** 2 + (this.z - a.z) ** 2);
  }

  /**
   * add each value
   *
   * @param {(Vector3 | number)} a
   * @memberof Vector3
   */
  public add(a: Vector3 | number) {
    if (a instanceof Vector3) {
      this.x += a.x;
      this.y += a.y;
      this.z += a.z;
    } else {
      this.x += a;
      this.y += a;
      this.z += a;
    }
  }

  /**
   * subtract each value
   *
   * @param {(Vector3 | number)} a
   * @memberof Vector3
   */
  public subtract(a: Vector3 | number) {
    if (a instanceof Vector3) {
      this.x -= a.x;
      this.y -= a.y;
      this.z -= a.z;
    } else {
      this.x -= a;
      this.y -= a;
      this.z -= a;
    }
  }

  /**
   * multiply each value
   *
   * @param {(Vector3 | number)} a
   * @memberof Vector3
   */
  public multiply(a: Vector3 | number) {
    if (a instanceof Vector3) {
      this.x *= a.x;
      this.y *= a.y;
      this.z *= a.z;
    } else {
      this.x *= a;
      this.y *= a;
      this.z *= a;
    }
  }

  /**
   * divide each value
   *
   * @param {(Vector3 | number)} a
   * @memberof Vector3
   */
  public divide(a: Vector3 | number) {
    if (a instanceof Vector3) {
      console.assert(a.x !== 0 && a.y !== 0 && a.z !== 0);
      this.x /= a.x;
      this.y /= a.y;
      this.z /= a.z;
    } else {
      console.assert(a !== 0);
      this.x /= a;
      this.y /= a;
      this.z /= a;
    }
  }

  /**
   * normalize
   *
   * @memberof Vector3
   */
  public normalize() {
    this.divide(this.length());
  }

  /**
   * dot
   *
   * @param {Vector3} a
   * @return {*}  {number}
   * @memberof Vector3
   */
  public dot(a: Vector3): number {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  }

  /**
   * cross
   *
   * @param {Vector3} a
   * @return {*}  {Vector3}
   * @memberof Vector3
   */
  public cross(a: Vector3): Vector3 {
    return new Vector3(
      this.y * a.z - this.z * a.y,
      this.z * a.x - this.x * a.z,
      this.x * a.y - this.y * a.x
    );
  }

  /**
   * evaluate if each value is equal with a
   *
   * @param {Vector3} a
   * @return {*}  {boolean}
   * @memberof Vector3
   */
  public equal(a: Vector3): boolean {
    return this.x === a.x && this.y === a.y && this.z === a.z;
  }

  /**
   * clone variable (create new instance)
   *
   * @return {*}  {Vector3}
   * @memberof Vector3
   */
  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * get values as float32array
   *
   * @return {*}  {Float32Array}
   * @memberof Vector3
   */
  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z]);
  }

  /**
   * set value to webgl program
   *
   * @param {WebGLRenderingContext} gl
   * @param {WebGLUniformLocation} location
   * @memberof Vector3
   */
  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform3fv(location, this.getArray());
  }
}

export { Vector3 };
