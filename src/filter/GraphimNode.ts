/* eslint-disable no-unused-vars */
import { UniformSetter } from './UniformSetter';
import { FullScreenQuad } from './FullScreenQuad';
import { compileShader, linkProgram, setupRenderTexture } from '../utils';
import quadVertex from './glsl/quad.vs';
import headVector from './glsl/variable.fs';

export type RenderID = string;
export type CanvasID = string;

/**
 * filters pass this object to next filter
 *
 * @export
 * @interface ForwardingData
 */
export interface ForwardingData {
  targetTexture: WebGLTexture | null;
  renderID: RenderID;
}

/**
 * renderer pass this object to inform render settings and default variables
 *
 * @export
 * @interface RenderSetting
 */
export interface RenderSetting {
  renderID: RenderID;
  canvasID: CanvasID;
  renderToCanvas: boolean;
  time: number;
  mouse: [number, number];
  isHover: boolean;
  inputTexture: WebGLTexture;
  gl: WebGLRenderingContext;
}

/**
 * The base class of node
 *
 * @export
 * @abstract
 * @class GraphimNode
 */
export abstract class GraphimNode {
  protected initialized: string = '';

  /**
   * Result of this node
   *
   * @type {ForwardingData}
   * @memberof GraphimNode
   */
  public renderResult: ForwardingData = { targetTexture: null, renderID: '' };

  // webgl buffers
  protected gl: WebGLRenderingContext | null = null;

  protected fragmentSource: string = '';

  protected framebuffer: WebGLFramebuffer | null = null;

  protected vertexShader: WebGLShader | null = null;

  protected fragmentShader: WebGLShader | null = null;

  protected program: WebGLProgram | null = null;

  protected quad: FullScreenQuad | null = null;

  protected uniforms: UniformSetter | null = null;

  protected inputTextureLocation: WebGLUniformLocation | null = null;

  // intput and output
  protected outputNode: GraphimNode[] = [];

  protected inputNode: GraphimNode | null = null;

  /**
   * Creates an instance of GraphimNode.
   * @param {string} fragmentSource
   * @param {UniformSetter} [uniforms]
   * @memberof GraphimNode
   */
  constructor(fragmentSource: string, uniforms?: UniformSetter) {
    this.fragmentSource = fragmentSource;
    this.uniforms = uniforms || new UniformSetter({});
  }

  /**
   * Initialize webgl objects (only renderer calls)
   *
   * @param {WebGLRenderingContext} gl
   * @param {CanvasID} canvasID
   * @memberof GraphimNode
   */
  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    if (this.initialized) this.release();
    this.initialized = canvasID;
    this.gl = gl;

    this.framebuffer = <WebGLFramebuffer>gl.createFramebuffer();
    this.renderResult.targetTexture = <WebGLTexture>gl.createTexture();

    setupRenderTexture(gl, this.framebuffer, this.renderResult.targetTexture);

    this.vertexShader = <WebGLShader>gl.createShader(gl.VERTEX_SHADER);
    this.fragmentShader = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER);

    compileShader(gl, this.vertexShader, quadVertex);
    compileShader(gl, this.fragmentShader, `${headVector}\n${this.fragmentSource}`);

    this.program = <WebGLProgram>gl.createProgram();
    linkProgram(gl, this.program, this.vertexShader, this.fragmentShader);

    this.quad = new FullScreenQuad();
    this.quad.init(gl, this.program);

    this.uniforms?.init(this.gl, this.program);

    this.inputTextureLocation = gl.getUniformLocation(<WebGLProgram>this.program, 'targetTexture');
  }

  /**
   * Release the webgl objects (only renderer calls)
   *
   * @return {*} 
   * @memberof GraphimNode
   */
  public release() {
    if (!this.initialized) return;
    this.gl?.deleteFramebuffer(this.framebuffer);
    this.gl?.deleteTexture(this.renderResult.targetTexture);
    this.gl?.deleteShader(this.vertexShader);
    this.gl?.deleteShader(this.fragmentShader);
    this.gl?.deleteProgram(this.program);

    this.quad?.release(this.gl as WebGLRenderingContext);
    this.initialized = '';
  }

  /**
   * Render this node
   *
   * @abstract
   * @param {RenderSetting} setting
   * @memberof GraphimNode
   */
  public abstract render(setting: RenderSetting): void;

  /**
   * Get render result
   *
   * @return {*}  {ForwardingData}
   * @memberof GraphimNode
   */
  public getRenderResult(): ForwardingData {
    return this.renderResult;
  }

  /**
   * if disconnect node, remove its output node from outputNode list
   *
   * @param {GraphimNode} node
   * @memberof GraphimNode
   */
  public removeOutputNode(node: GraphimNode) {
    this.outputNode = this.outputNode.filter((item) => item !== node);
    if (this.outputNode.length === 0) this.release();
  }

  /**
   * if connect node, add its output node to outputNode list
   *
   * @param {GraphimNode} node
   * @memberof GraphimNode
   */
  public setOutputNode(node: GraphimNode) {
    this.outputNode.push(node);
  }
}
