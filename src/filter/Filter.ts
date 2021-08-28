import { FullScreenQuad } from './FullScreenQuad';
import quadVertex from './glsl/quad.vs';
import headVector from './glsl/default.fs';
import { UniformSetter } from './UniformSetter';

export interface FilterRenderingInfo {
  targetTexture: WebGLTexture;
  renderToCanvas?: boolean;
  time?: number;
  mouse?: [number, number];
  isHover?: boolean;
}

const compileShader = (gl: WebGLRenderingContext, shader: WebGLShader, source: string) => {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(source);
    throw new Error(<string>gl.getShaderInfoLog(shader));
  }
};

const linkProgram = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  vertex: WebGLShader,
  fragment: WebGLShader
) => {
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);

  gl.linkProgram(program);
};

const setupRenderTexture = (
  gl: WebGLRenderingContext,
  frameBuffer: WebGLFramebuffer,
  texture: WebGLTexture,
  width: number,
  height: number
) => {
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
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

  private uniforms: UniformSetter;

  constructor(fragmentSource: string, uniforms?: UniformSetter) {
    this.fragmentSource = fragmentSource;
    this.uniforms = uniforms || new UniformSetter({});
  }

  public init(gl: WebGLRenderingContext, width: number, height: number) {
    this.gl = gl;

    this.framebuffer = <WebGLFramebuffer>gl.createFramebuffer();
    this.targetTexture = <WebGLTexture>gl.createTexture();
    this.width = width;
    this.height = height;

    setupRenderTexture(gl, this.framebuffer, this.targetTexture, this.width, this.height);

    this.vertexShader = <WebGLShader>gl.createShader(gl.VERTEX_SHADER);
    this.fragmentShader = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER);

    compileShader(gl, this.vertexShader, quadVertex);
    compileShader(gl, this.fragmentShader, `${headVector}\n${this.fragmentSource}`);

    this.program = <WebGLProgram>gl.createProgram();
    linkProgram(gl, this.program, this.vertexShader, this.fragmentShader);

    this.quad = new FullScreenQuad();
    this.quad.init(gl, this.program);

    this.uniforms.init(this.gl, this.program);
  }

  public render({ targetTexture, renderToCanvas, time, mouse = [0, 0], isHover = false }: FilterRenderingInfo) {
    const gl = <WebGLRenderingContext>this.gl;

    if (renderToCanvas) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      // frame buffer rendering
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    }

    // set variables
    gl.useProgram(this.program);
    this.quad?.render(gl);
    this.uniforms.render(gl, !!renderToCanvas, time, mouse, isHover);

    // set render texture
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);

    const prevTextureLocation = gl.getUniformLocation(<WebGLProgram>this.program, 'targetTexture');

    gl.uniform1i(prevTextureLocation, 0);

    // render
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clearDepth(0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, this.width, this.height);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.flush();
  }

  public getRenderTexture() {
    return this.targetTexture;
  }
}

export { Filter };
