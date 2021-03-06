import defaultFs from './glsl/default.fs';
import { CanvasID, ForwardingData, GraphimNode, RenderSetting } from './GraphimNode';
import { MiddleNode } from './MiddleNode';
import { setupRenderTexture } from '../utils';

/**
 * Delay one frame
 *
 * @export
 * @class DelayNode
 * @extends {MiddleNode}
 */
export class DelayNode extends MiddleNode {
  private resultSwitch = 0;

  private framebuffer2: WebGLFramebuffer | null = null;

  private renderResult2: ForwardingData = {
    targetTexture: null,
    renderID: '',
  };

  /**
   * Creates an instance of DelayNode.
   * @memberof DelayNode
   */
  constructor() {
    super(defaultFs);
  }

  /**
   * Initialize (only renderer calls)
   *
   * @param {WebGLRenderingContext} gl
   * @param {CanvasID} canvasID
   * @memberof DelayNode
   */
  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    super.init(gl, canvasID);

    this.framebuffer2 = <WebGLFramebuffer>gl.createFramebuffer();
    this.renderResult2.targetTexture = <WebGLTexture>gl.createTexture();
    setupRenderTexture(gl, this.framebuffer2, this.renderResult2.targetTexture);
  }

  /**
   * Release webgl objects 
   *
   * @memberof DelayNode
   */
  public release() {
    super.release();
    this.gl?.deleteFramebuffer(this.framebuffer2);
    this.gl?.deleteFramebuffer(this.renderResult2.targetTexture);
  }

  /**
   * Render previous frame (only renderer calls)
   *
   * @param {RenderSetting} setting
   * @return {*} {void}
   * @memberof DelayNode
   */
  public render(setting: RenderSetting): void {
    if (!this.gl || !this.initialized || setting.canvasID !== this.initialized) {
      this.init(setting.gl, setting.canvasID);
      if (!this.gl) throw new Error('gl is not initialized');
    }
    if (this.getRenderResult().renderID === setting.renderID) return;
    this.getNowRenderResult().renderID = setting.renderID;

    // switch
    this.resultSwitch = 1 - this.resultSwitch;

    const { renderToCanvas } = setting;
    // eslint-disable-next-line no-param-reassign
    setting.renderToCanvas = false;

    this.inputNode?.render(setting);

    const { gl } = this;
    const { time: uniformTime, mouse: uniformMouse, isHover: uniformIsHover } = setting;
    const { targetTexture: inputTexture } = (this.inputNode as GraphimNode).getRenderResult();

    if (renderToCanvas) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      // frame buffer rendering
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.getNowFrameBuffer());
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        this.getNowRenderResult().targetTexture,
        0
      );
    }

    // set variables
    gl.useProgram(this.program);
    this.quad?.render(gl);
    this.uniforms?.render(gl, !!renderToCanvas, uniformTime, uniformMouse, uniformIsHover);

    // set render texture
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(this.inputTextureLocation, 0);

    // render
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clearDepth(0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.flush();
  }

  /**
   * Get current frame buffer
   *
   * @return {*}  {(WebGLFramebuffer | null)}
   * @memberof DelayNode
   */
  public getNowFrameBuffer(): WebGLFramebuffer | null {
    if (this.resultSwitch === 0) return this.framebuffer2;
    return this.framebuffer;
  }

  /**
   * Get render result
   *
   * @return {*}  {ForwardingData}
   * @memberof DelayNode
   */
  public getRenderResult(): ForwardingData {
    if (this.resultSwitch === 0) return this.renderResult;
    return this.renderResult2;
  }

  /**
   * Get current render result
   *
   * @return {*}  {ForwardingData}
   * @memberof DelayNode
   */
  public getNowRenderResult(): ForwardingData {
    if (this.resultSwitch === 0) return this.renderResult2;
    return this.renderResult;
  }
}
