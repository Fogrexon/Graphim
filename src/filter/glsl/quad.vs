attribute vec3 position;
attribute vec2 uv;

varying mediump vec4 vPosition;
varying mediump vec2 vUv;

void main(void) {
  vPosition = vec4(position, 1.0);
  vUv = uv;

  gl_Position = vPosition;
}
