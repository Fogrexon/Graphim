import quadVertex from './glsl/quad.vs';

export interface FilterRenderingInfo {
  targetTexture: WebGLTexture;
}

const compileShader = (
  gl: WebGLRenderingContext,
  shader: WebGLShader,
  source: string,
) => {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(source);
    throw new Error(<string>gl.getShaderInfoLog(shader));
  }
};

class Filter {
  private fragmentSource: string;

  private gl: WebGLRenderingContext;

  private width: number;

  private height: number;

  private framebuffer: WebGLFramebuffer;

  private targetTexture: WebGLTexture;

  private vertexShader: WebGLShader;

  private fragmentShader: WebGLShader;

  constructor(fragmentSource: string) {
    this.fragmentSource = fragmentSource;
  }

  public init(gl: WebGLRenderingContext, width: number, height: number) {
    this.gl = gl;

    this.framebuffer = <WebGLFramebuffer>gl.createFramebuffer();
    this.targetTexture = <WebGLTexture>gl.createTexture();
    this.width = width;
    this.height = height;
  }

  public render({targetTexture}: FilterRenderingInfo) {
    const { gl } = this;

    // frame buffer rendering
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.targetTexture, 0,
    );

    // set render texture

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
  }
}

export { Filter };
