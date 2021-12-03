/* eslint-disable no-param-reassign */
export /**
 * comple shader from source
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} shader
 * @param {string} source
 */
const compileShader = (gl: WebGLRenderingContext, shader: WebGLShader, source: string) => {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(source);
    throw new Error(<string>gl.getShaderInfoLog(shader));
  }
};

export /**
 * link vertex and fragment texture
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {WebGLShader} vertex
 * @param {WebGLShader} fragment
 */
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

export /**
 * Bind texture to framebuffer as render texture
 * 
 * @param {WebGLRenderingContext} gl
 * @param {WebGLFramebuffer} frameBuffer
 * @param {WebGLTexture} texture
 */
const setupRenderTexture = (
  gl: WebGLRenderingContext,
  frameBuffer: WebGLFramebuffer,
  texture: WebGLTexture
) => {
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
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
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};

export /**
 * Bind image element to texture object
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLTexture} texture
 * @param {HTMLImageElement} image
 */
const bindTexture = (
  gl: WebGLRenderingContext,
  texture: WebGLTexture,
  image: HTMLImageElement
) => {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.bindTexture(gl.TEXTURE_2D, null);
};

export /**
 * Copy element attributes(width / height / class / id / style / dataset) from a to b
 *
 * @param {(HTMLImageElement | HTMLCanvasElement)} a
 * @param {(HTMLImageElement | HTMLCanvasElement)} b
 */
const copyElementAttributes = (
  a: HTMLImageElement | HTMLCanvasElement,
  b: HTMLImageElement | HTMLCanvasElement
) => {
  a.width = b.width;
  a.height = b.height;
  b.classList.forEach((className) => {
    a.classList.add(className);
  });
  a.id = b.id;
  Object.entries(b.style).forEach(([key, value]) => {
    a.style.setProperty(key, value);
  });
  Object.entries(b.dataset).forEach(([key, value]) => {
    a.setAttribute(`data-${key}`, <string>value);
  });
};
