attribute vec3 position;
attribute vec2 uv;

varying mediump vec4 vPosition;
varying mediump vec2 vUv;

uniform float flipY;

void main(void) {
  vPosition = vec4(position * vec3(1.0, flipY, 1.0), 1.0);
  vUv = uv;

  gl_Position = vPosition;
}
