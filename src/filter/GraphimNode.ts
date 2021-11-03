import { UniformSetter } from "..";
import { FullScreenQuad } from "./FullScreenQuad";
import { compileShader, linkProgram, setupRenderTexture } from "./utils";
import quadVertex from './glsl/quad.vs';
import headVector from './glsl/variables.fs';

/* eslint-disable no-unused-vars */
export type RenderID = string;

export interface ForwardingData {
  targetTexture: WebGLTexture | null;
  renderID: RenderID;
}

export interface RenderSetting {
  renderID: RenderID;
  renderToCanvas: boolean;
  time: number;
  mouse: [number, number];
  isHover: boolean;
  inputTexture: WebGLTexture;
  gl: WebGLRenderingContext;
}

export abstract class GraphimNode {
  protected initialized: string = '';

  public renderResult: ForwardingData = {targetTexture: null, renderID: ''};

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

  constructor(fragmentSource: string, uniforms?: UniformSetter) {
    this.fragmentSource = fragmentSource;
    this.uniforms = uniforms || new UniformSetter({});
  }

  public init(gl: WebGLRenderingContext) {
    if(this.initialized) this.release();
    this.initialized = gl.canvas.dataset.uuid as string;
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

  public release() {
    if (!this.initialized) return;
    this.gl?.deleteFramebuffer(this.framebuffer);
    this.gl?.deleteShader(this.vertexShader);
    this.gl?.deleteShader(this.fragmentShader);
    this.gl?.deleteProgram(this.program);

    this.quad?.release(this.gl as WebGLRenderingContext);
    this.initialized = "";
  }

  public abstract render(setting: RenderSetting): void;

  public getRenderResult(): ForwardingData {
    return this.renderResult;
  };

  public removeOutputNode(node: GraphimNode) {
    this.outputNode = this.outputNode.filter(item => item !== node);
  }

  public setOutputNode(node: GraphimNode) {
    this.outputNode.push(node);
  }
}
