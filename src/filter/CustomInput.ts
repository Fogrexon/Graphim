/* eslint-disable class-methods-use-this */
import { CanvasID, GraphimNode, RenderSetting } from "./GraphimNode";
import defaultFs from './glsl/default.fs';
import { bindTexture } from "../utils";

export abstract class DefaultInput extends GraphimNode {

  private image: HTMLImageElement;

  constructor(image: HTMLImageElement) {
    super(defaultFs);
    this.image = image;
  }

  // eslint-disable-next-line no-unused-vars
  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    
    this.renderResult.targetTexture = <WebGLTexture>gl.createTexture();
    bindTexture(gl, this.renderResult.targetTexture, this.image);
  }

  public release() {
    this.gl?.deleteTexture(this.renderResult.targetTexture);
  }

  public render(setting: RenderSetting): void {
    // pass the input texture
    this.renderResult.renderID = setting.renderID;
    if(setting.renderToCanvas) console.warn('DefaultInput cannot be destination node.');
  }
}