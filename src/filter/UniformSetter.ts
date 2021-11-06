import { Uniform, Vector2 } from '../utils/Uniforms';

class UniformSetter {
  public valueMap: {
    [key: string]: Uniform;
  } = {};

  public locationMap: {
    [key: string]: WebGLUniformLocation;
  } = {};

  private gl: WebGLRenderingContext | null = null;

  private program: WebGLProgram | null = null;

  private flipYLocation: WebGLUniformLocation = -1;

  private timeLocation: WebGLUniformLocation = -1;

  private aspectLocation: WebGLUniformLocation = -1;

  private mouseLocation: WebGLUniformLocation = -1;

  private isHoverLocation: WebGLUniformLocation = -1;

  constructor(
    valueMap: {
      [key: string]: Uniform;
    } = {}
  ) {
    this.valueMap = valueMap;
  }

  public addUniform(varName: string, value: Uniform) {
    this.valueMap[varName] = value;
    if (this.gl && this.program) {
      this.locationMap[varName] = <WebGLUniformLocation>(
        this.gl.getUniformLocation(this.program, varName)
      );
    }
  }

  public removeUniform(varName: string) {
    delete this.valueMap[varName];
    delete this.locationMap[varName];
  }

  public init(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.flipYLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'flipY');
    this.timeLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'time');
    this.aspectLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'resolution');
    this.mouseLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'mouse');
    this.isHoverLocation = <WebGLUniformLocation>gl.getUniformLocation(program, 'isHover');

    Object.entries(this.valueMap).forEach(([label]) => {
      this.locationMap[label] = <WebGLUniformLocation>gl.getUniformLocation(program, label);
    });
    this.gl = gl;
    this.program = program;
  }

  public render(
    gl: WebGLRenderingContext,
    renderToCanvas: boolean,
    time?: number,
    mouse?: [number, number],
    isHover?: boolean
  ) {
    gl.uniform1f(this.flipYLocation, renderToCanvas ? -1 : 1);
    gl.uniform1f(this.timeLocation, time || 0);
    gl.uniform2fv(this.aspectLocation, new Vector2(gl.canvas.width, gl.canvas.height).getArray());
    gl.uniform2fv(this.mouseLocation, new Float32Array(mouse || [0, 0]));
    gl.uniform1i(this.isHoverLocation, isHover ? 1 : 0);

    Object.entries(this.valueMap).forEach(([label, value]) => {
      value.setUniform(gl, this.locationMap[label]);
    });
  }

  public set(label: string, value: Uniform) {
    this.valueMap[label] = value;
  }
}

export { UniformSetter };
