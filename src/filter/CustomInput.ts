/* eslint-disable class-methods-use-this */
import { CanvasID, GraphimNode, RenderSetting } from './GraphimNode';
import defaultFs from './glsl/default.fs';
import { bindTexture } from '../utils';

/**
 * Pass the another texture (for mask, blend, normal...)
 *
 * @export
 * @class CustomInput
 * @extends {GraphimNode}
 */
export class CustomInput extends GraphimNode {
  private image: HTMLImageElement;

  /**
   * Creates an instance of CustomInput.
   * @param {HTMLImageElement} image
   * @memberof CustomInput
   */
  constructor(image: HTMLImageElement) {
    super(defaultFs);
    this.image = image;
  }

  /**
   * Initialize
   *
   * @param {WebGLRenderingContext} gl
   * @param {CanvasID} canvasID - unused
   * @memberof CustomInput
   */
  // eslint-disable-next-line no-unused-vars
  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    this.gl = gl;
    this.renderResult.targetTexture = <WebGLTexture>gl.createTexture();
    bindTexture(gl, this.renderResult.targetTexture, this.image);
  }

  /**
   * Reassign image
   *
   * @param {HTMLImageElement} image
   * @return {*} 
   * @memberof CustomInput
   */
  public setImage(image: HTMLImageElement) {
    if (!this.initialized) return;
    bindTexture(
      this.gl as WebGLRenderingContext,
      this.renderResult.targetTexture as WebGLTexture,
      image
    );
  }

  /**
   * Release webgl objects
   *
   * @memberof CustomInput
   */
  public release() {
    this.gl?.deleteTexture(this.renderResult.targetTexture);
    this.initialized = '';
  }

  public render(setting: RenderSetting): void {
    if (!this.gl || !this.initialized || setting.canvasID !== this.initialized) {
      this.init(setting.gl, setting.canvasID);
      if (!this.gl) throw new Error('gl is not initialized');
    }
    // pass the input texture
    this.renderResult.renderID = setting.renderID;
    if (setting.renderToCanvas) console.warn('DefaultInput cannot be destination node.');
  }
}
