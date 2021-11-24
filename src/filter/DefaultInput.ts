/* eslint-disable class-methods-use-this */
import { CanvasID, GraphimNode, RenderSetting } from './GraphimNode';
import defaultFs from './glsl/default.fs';

/**
 * Original image input node
 *
 * @export
 * @class DefaultInput
 * @extends {GraphimNode}
 */
export class DefaultInput extends GraphimNode {
  constructor() {
    super(defaultFs);
  }

  /**
   * Initialize (only renderer calls)
   *
   * @param {WebGLRenderingContext} gl - unused
   * @param {CanvasID} canvasID - unused
   * @memberof DefaultInput
   */
  // eslint-disable-next-line no-unused-vars
  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    // nothing to do
  }

  /**
   * Release webgl objects (only renderer calls)
   *
   * @memberof DefaultInput
   */
  public release() {
    // nothing to do
  }

  /**
   * pass the input texture (only renderer calls)
   *
   * @param {RenderSetting} setting
   * @memberof DefaultInput
   */
  public render(setting: RenderSetting): void {
    // pass the input texture
    this.renderResult.targetTexture = setting.inputTexture;
    this.renderResult.renderID = setting.renderID;
    if (setting.renderToCanvas) console.warn('DefaultInput cannot be destination node.');
  }
}
