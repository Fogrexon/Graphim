import headVector from './glsl/default.fs';
import { UniformSetter } from './UniformSetter';
import { GraphimNode, RenderSetting } from './GraphimNode';
import { compileShader } from './utils';
import { BlendNode } from './BlendNode';

export class Filter extends BlendNode {

  public init(gl: WebGLRenderingContext) {
    super.init(gl);

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
    if (!this.gl || !this.initialized || setting.gl.canvas.dataset.uuid !== this.gl?.canvas.dataset.uuid) {
      throw new Error('RenderingContext is not initialized.');
    }
    if (this.renderResult.renderID === setting.renderID) return;
  
    this.inputNode?.render(setting);
    this.inputNode2?.render(setting);

    const { gl } = this;
    const {
      renderToCanvas,
      time: uniformTime,
      mouse: uniformMouse,
      isHover: uniformIsHover
    } = setting;
    const { targetTexture: inputTexture } = (this.inputNode as GraphimNode).GetRenderResult();
    const { targetTexture: inputTexture2 } = (this.inputNode2 as GraphimNode).GetRenderResult();

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
    gl.uniform1i(this.inputTextureLocation, 0);
  
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture2);
    gl.uniform1i(this.inputTextureLocation2, 1);

    // set default active texture (0)
    gl.activeTexture(gl.TEXTURE0)

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
