import headVector from './glsl/default.fs';
import { UniformSetter } from './UniformSetter';
import { CanvasID, GraphimNode, RenderSetting } from './GraphimNode';
import { compileShader } from '../utils';
import { MiddleNode } from './MiddleNode';

export class Filter extends MiddleNode {

  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    super.init(gl, canvasID);
  }

  public getInitializedUUID() {
    return this.initialized;
  }

  public setShader(newShader: string, newUniforms?: UniformSetter) {
    if (!this.gl || !this.program || !this.vertexShader || !this.fragmentShader) {
      console.warn('filter is not initialized.');
      return;
    }

    this.fragmentSource = newShader;
    compileShader(this.gl, this.fragmentShader, `${headVector}\n${this.fragmentSource}`);

    this.gl.linkProgram(this.program);

    if (newUniforms) {
      this.uniforms = newUniforms;
    }
    this.uniforms?.init(this.gl, this.program);
  }

  public render(setting: RenderSetting) {
    if (!this.gl || !this.initialized || setting.canvasID !== this.initialized) {
      this.init(setting.gl, setting.canvasID);
      if(!this.gl) throw new Error('gl is not initialized');
    }
    if (this.renderResult.renderID === setting.renderID) return;
    this.renderResult.renderID = setting.renderID;

    const {renderToCanvas} = setting;
    // eslint-disable-next-line no-param-reassign
    setting.renderToCanvas = false;
  
    this.inputNode?.render(setting);

    const { gl } = this;
    const {
      time: uniformTime,
      mouse: uniformMouse,
      isHover: uniformIsHover
    } = setting;
    const { targetTexture: inputTexture } = (this.inputNode as GraphimNode).getRenderResult();

    if (renderToCanvas) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      // frame buffer rendering
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        this.renderResult.targetTexture,
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
}
