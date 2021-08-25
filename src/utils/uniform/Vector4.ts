import { Uniform } from './Uniform';

class Vector4 implements Uniform {
  public x: number;

  public y: number;

  public z: number;

  public w: number;

  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

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

  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0 + this.z ** 2.0 + this.w ** 2.0;
  }

  public length(): number {
    return Math.sqrt(this.length2());
  }

  public distance(a: Vector4): number {
    return Math.sqrt(
      (this.x - a.x) ** 2 + (this.y - a.y) ** 2 + (this.z - a.z) ** 2 + (this.w - a.w) ** 2
    );
  }

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

  public normalize() {
    this.divide(this.length());
  }

  public dot(a: Vector4): number {
    return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
  }

  public equal(a: Vector4): boolean {
    return this.x === a.x && this.y === a.y && this.z === a.z && this.w === a.w;
  }

  public clone(): Vector4 {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z, this.w]);
  }

  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform4fv(location, this.getArray());
  }
}

export { Vector4 };
