import { GraphimNode, RenderSetting } from "./GraphimNode";
import defaultFs from './glsl/default.fs';

export abstract class DefaultInput extends GraphimNode {

  constructor() {
    super(defaultFs);
  }

  public render(setting: RenderSetting): void {
    if (!this.gl || !this.initialized || setting.canvasID !== this.initialized) {
      this.init(setting.gl, setting.canvasID);
      if(!this.gl) throw new Error('gl is not initialized');
    }
    if (this.renderResult.renderID === setting.renderID) return;

    const {renderToCanvas} = setting;
    // eslint-disable-next-line no-param-reassign
    setting.renderToCanvas = false;

    const { gl } = this;
    const {
      inputTexture,
      time: uniformTime,
      mouse: uniformMouse,
      isHover: uniformIsHover,
    } = setting;

    if (renderToCanvas) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      // frame buffer rendering
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
      gl.bindTexture(gl.TEXTURE, this.renderResult.targetTexture);
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

    const prevTextureLocation = gl.getUniformLocation(<WebGLProgram>this.program, 'targetTexture');

    gl.uniform1i(prevTextureLocation, 0);

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
}