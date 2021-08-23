import { Uniform } from './Uniform';

class Vector3 implements Uniform {
  public x: number;

  public y: number;

  public z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

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

  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0 + this.z ** 2.0;
  }

  public length(): number {
    return Math.sqrt(this.length2());
  }

  public distance(a: Vector3): number {
    return Math.sqrt(
      (this.x - a.x) ** 2 + (this.y - a.y) ** 2 + (this.z - a.z) ** 2,
    );
  }

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

  public normalize() {
    this.divide(this.length());
  }

  public dot(a: Vector3): number {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  }

  public cross(a: Vector3): Vector3 {
    return new Vector3(
      this.y * a.z - this.z * a.y,
      this.z * a.x - this.x * a.z,
      this.x * a.y - this.y * a.x,
    );
  }

  public equal(a: Vector3): boolean {
    return this.x === a.x && this.y === a.y && this.z === a.z;
  }

  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z]);
  }

  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform3fv(location, this.getArray());
  }
}

export { Vector3 };
