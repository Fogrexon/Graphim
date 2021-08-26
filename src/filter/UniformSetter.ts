import { Uniform, Vector2 } from '../utils/Uniforms';

class UniformSetter {
  public valueMap: {
    [key: string]: Uniform;
  } = {};

  public locationMap: {
    [key: string]: WebGLUniformLocation;
  } = {};

  private flipYLocation: WebGLUniformLocation = -1;

  private timeLocation: WebGLUniformLocation = -1;

  private aspectLocation: WebGLUniformLocation = -1;

  constructor(valueMap: {
    [key: string]: Uniform;
  }) {
    this.valueMap = valueMap;
  }

  public init(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.flipYLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'flipY');
    this.timeLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'time');
    this.aspectLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'resolution');

    Object.entries(this.valueMap).forEach(([label]) => {
      this.locationMap[label] = <WebGLUniformLocation>gl.getUniformLocation(program, label);
    });
  }

  public render(gl: WebGLRenderingContext, renderToCanvas: boolean, time?: number) {
    gl.uniform1f(this.flipYLocation, renderToCanvas ? -1 : 1);
    gl.uniform1f(this.timeLocation, time || 0);
    gl.uniform2fv(this.aspectLocation, new Vector2(gl.canvas.width, gl.canvas.height).getArray());

    Object.entries(this.valueMap).forEach(([label, value]) => {
      value.setUniform(gl, this.locationMap[label]);
    });
  }

  public set(label: string, value: Uniform) {
    this.valueMap[label] = value;
  }
}

export { UniformSetter };
