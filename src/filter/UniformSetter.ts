import { Uniform, Vector2 } from '../utils/Uniforms';

/**
 * Helper class to set uniforms
 *
 * @class UniformSetter
 */
class UniformSetter {
  /**
   * map of uniform values
   *
   * @type {{
   *     [key: string]: Uniform;
   *   }}
   * @memberof UniformSetter
   */
  public valueMap: {
    [key: string]: Uniform;
  } = {};

  /**
   * map of location of uniforms
   *
   * @type {{
   *     [key: string]: WebGLUniformLocation;
   *   }}
   * @memberof UniformSetter
   */
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

  /**
   * Creates an instance of UniformSetter.
   * @param {{
   *       [key: string]: Uniform;
   *     }} [valueMap={}]
   * @memberof UniformSetter
   */
  constructor(
    valueMap: {
      [key: string]: Uniform;
    } = {}
  ) {
    this.valueMap = valueMap;
  }

  /**
   * Add uniform 
   *
   * @param {string} varName
   * @param {Uniform} value
   * @memberof UniformSetter
   */
  public addUniform(varName: string, value: Uniform) {
    this.valueMap[varName] = value;
    if (this.gl && this.program) {
      this.locationMap[varName] = <WebGLUniformLocation>(
        this.gl.getUniformLocation(this.program, varName)
      );
    }
  }
  
  /**
   * Get uniform object
   *
   * @param {string} varName
   * @return {*}  {Uniform}
   * @memberof UniformSetter
   */
  public getUniform(varName: string): Uniform {
    return this.valueMap[varName];
  }
  
  /**
   * Remove uniform object
   *
   * @param {string} varName
   * @memberof UniformSetter
   */
  public removeUniform(varName: string) {
    delete this.valueMap[varName];
    delete this.locationMap[varName];
  }

  /**
   * Replace uniform object
   *
   * @param {string} label
   * @param {Uniform} value
   * @memberof UniformSetter
   */
  public setUniform(label: string, value: Uniform) {
    this.valueMap[label] = value;
  }
  
  /**
   * Initialize (only node calls)
   *
   * @param {WebGLRenderingContext} gl
   * @param {WebGLProgram} program
   * @memberof UniformSetter
   */
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

  /**
   * pass values to shader
   *
   * @param {WebGLRenderingContext} gl
   * @param {boolean} renderToCanvas
   * @param {number} [time]
   * @param {[number, number]} [mouse]
   * @param {boolean} [isHover]
   * @memberof UniformSetter
   */
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

}

export { UniformSetter };
