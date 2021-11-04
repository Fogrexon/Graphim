/* eslint-disable class-methods-use-this */
import { CanvasID, GraphimNode, RenderSetting } from './GraphimNode';
import defaultFs from './glsl/default.fs';

export abstract class DefaultInput extends GraphimNode {
  constructor() {
    super(defaultFs);
  }

  // eslint-disable-next-line no-unused-vars
  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    // nothing to do
  }

  public release() {
    // nothing to do
  }

  public render(setting: RenderSetting): void {
    // pass the input texture
    this.renderResult.targetTexture = setting.inputTexture;
    this.renderResult.renderID = setting.renderID;
    if (setting.renderToCanvas) console.warn('DefaultInput cannot be destination node.');
  }
}
