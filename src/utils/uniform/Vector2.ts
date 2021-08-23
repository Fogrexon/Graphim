import { Uniform } from './Uniform';

class Vector2 implements Uniform {
  public x: number;

  public y: number;

  constructor(_x: number, _y: number) {
    this.x = _x;
    this.y = _y;
  }

  public set(x: number | Vector2, y: number = 0) {
    if (x instanceof Vector2) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0;
  }

  public length(): number {
    return Math.sqrt(this.length2());
  }

  public distance(a: Vector2): number {
    return Math.sqrt(
      (this.x - a.x) ** 2 + (this.y - a.y) ** 2,
    );
  }

  public add(a: Vector2 | number) {
    if (a instanceof Vector2) {
      this.x += a.x;
      this.y += a.y;
    } else {
      this.x += a;
      this.y += a;
    }
  }

  public subtract(a: Vector2 | number) {
    if (a instanceof Vector2) {
      this.x -= a.x;
      this.y -= a.y;
    } else {
      this.x -= a;
      this.y -= a;
    }
  }

  public multiply(a: Vector2 | number) {
    if (a instanceof Vector2) {
      this.x *= a.x;
      this.y *= a.y;
    } else {
      this.x *= a;
      this.y *= a;
    }
  }

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

  public normalize() {
    this.divide(this.length());
  }

  public dot(a: Vector2): number {
    return this.x * a.x + this.y * a.y;
  }

  public equal(a: Vector2): boolean {
    return this.x === a.x && this.y === a.y;
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public copy(a: Vector2) {
    this.x = a.x;
    this.y = a.y;
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y]);
  }

  public setUniform(gl: WebGLRenderingContext, location: WebGLUniformLocation) {
    gl.uniform2fv(location, this.getArray());
  }
}

export { Vector2 };
