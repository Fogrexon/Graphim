/* eslint-disable class-methods-use-this */
import { CanvasID, GraphimNode, RenderSetting } from "./GraphimNode";
import defaultFs from './glsl/default.fs';
import { bindTexture } from "../utils";

export abstract class CustomInput extends GraphimNode {

  private image: HTMLImageElement;

  constructor(image: HTMLImageElement) {
    super(defaultFs);
    this.image = image;
  }

  // eslint-disable-next-line no-unused-vars
  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    this.gl = gl;
    this.renderResult.targetTexture = <WebGLTexture>gl.createTexture();
    bindTexture(gl, this.renderResult.targetTexture, this.image);
    this.initialized = canvasID;
  }

  public setImage(image: HTMLImageElement) {
    if (!this.initialized) return;
    bindTexture(this.gl as WebGLRenderingContext, this.renderResult.targetTexture as WebGLTexture, image);
  }

  public release() {
    this.gl?.deleteTexture(this.renderResult.targetTexture);
  }

  public render(setting: RenderSetting): void {
    if (!this.gl || !this.initialized || setting.canvasID !== this.initialized) {
      this.init(setting.gl, setting.canvasID);
      if(!this.gl) throw new Error('gl is not initialized');
    }
    // pass the input texture
    this.renderResult.renderID = setting.renderID;
    if(setting.renderToCanvas) console.warn('DefaultInput cannot be destination node.');
  }
}