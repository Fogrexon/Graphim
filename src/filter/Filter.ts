import { FullScreenQuad } from './FullScreenQuad/FullScreenQuad';
import quadVertex from './glsl/quad.vs';

export interface FilterRenderingInfo {
  targetTexture: WebGLTexture;
  renderToCanvas?: boolean;
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

const linkProgram = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  vertex: WebGLShader,
  fragment: WebGLShader,
) => {
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);

  gl.linkProgram(program);
};

class Filter {
  private fragmentSource: string;

  private gl: WebGLRenderingContext | null = null;

  private width: number = 0;

  private height: number = 0;

  private framebuffer: WebGLFramebuffer | null = null;

  private targetTexture: WebGLTexture | null = null;

  private vertexShader: WebGLShader | null = null;

  private fragmentShader: WebGLShader | null = null;

  private program: WebGLProgram | null = null;

  private quad: FullScreenQuad | null = null;

  constructor(fragmentSource: string) {
    this.fragmentSource = fragmentSource;
  }

  public init(gl: WebGLRenderingContext, width: number, height: number) {
    this.gl = gl;

    this.framebuffer = <WebGLFramebuffer>gl.createFramebuffer();
    this.targetTexture = <WebGLTexture>gl.createTexture();
    this.width = width;
    this.height = height;

    this.vertexShader = <WebGLShader>gl.createShader(gl.VERTEX_SHADER);
    this.fragmentShader = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER);

    compileShader(gl, this.vertexShader, quadVertex);
    compileShader(gl, this.fragmentShader, this.fragmentSource);

    this.program = <WebGLProgram>gl.createProgram();
    linkProgram(gl, this.program, this.vertexShader, this.fragmentShader);

    this.quad = new FullScreenQuad();
    this.quad.init(gl, this.program);
  }

  public render({ targetTexture, renderToCanvas }: FilterRenderingInfo) {
    const gl = <WebGLRenderingContext> this.gl;

    gl.useProgram(this.program);
    this.quad?.render(gl);

    if (renderToCanvas) {
      // frame buffer rendering
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

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
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    // set render texture
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    const prevTextureLocation = gl.getUniformLocation(<WebGLProgram> this.program, 'targetTexture');

    gl.uniform1i(prevTextureLocation, 1);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.flush();
  }

  public getRenderTexture() {
    return this.targetTexture;
  }
}

export { Filter };
