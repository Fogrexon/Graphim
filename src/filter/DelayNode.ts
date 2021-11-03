import defaultFs from './glsl/default.fs';
import { ForwardingData, GraphimNode, RenderSetting } from './GraphimNode';
import { MiddleNode } from './MiddleNode';
import { setupRenderTexture } from './utils';

export class DelayNode extends MiddleNode {
  private resultSwitch = 0;

  private framebuffer2: WebGLFramebuffer | null = null;
 
  private renderResult2: ForwardingData = {
    targetTexture: null,
    renderID: '',
  };
  
  constructor() {
    super(defaultFs);
  }

  public init(gl: WebGLRenderingContext) {
    super.init(gl);

    this.framebuffer2 = <WebGLFramebuffer>gl.createFramebuffer();
    this.renderResult2.targetTexture = <WebGLTexture>gl.createTexture();
    setupRenderTexture(gl, this.framebuffer2, this.renderResult2.targetTexture);
  }

  public render(setting: RenderSetting) {
    if (!this.gl || !this.initialized || setting.gl.canvas.dataset.uuid !== this.gl?.canvas.dataset.uuid) {
      throw new Error('RenderingContext is not initialized.');
    }
    if (this.getRenderResult().renderID === setting.renderID) return;
    this.getRenderResult().renderID = setting.renderID;

    this.inputNode?.render(setting);

    const { gl } = this;
    const {
      renderToCanvas,
      time: uniformTime,
      mouse: uniformMouse,
      isHover: uniformIsHover
    } = setting;
    const { targetTexture: inputTexture } = (this.inputNode as GraphimNode).getRenderResult();

    if (renderToCanvas) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      // frame buffer rendering
      if (this.resultSwitch === 0) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.getNowFrameBuffer());
        gl.bindTexture(gl.TEXTURE, this.getNowRenderResult().targetTexture);
      }
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.canvas.width,
        gl.canvas.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
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

  public getNowFrameBuffer(): WebGLFramebuffer | null {
    if (this.resultSwitch === 0) return this.framebuffer2;
    return this.framebuffer;
  }

  public getRenderResult(): ForwardingData {
    if (this.resultSwitch === 0) return this.renderResult;
    return this.renderResult2;
  }

  public getNowRenderResult(): ForwardingData {
    if (this.resultSwitch === 0) return this.renderResult2;
    return this.renderResult;
  }
}