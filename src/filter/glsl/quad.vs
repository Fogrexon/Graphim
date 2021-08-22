attribute vec3 position;
attribute vec2 uv;

varying mediump vec3 vPosition;
varying mediump vec2 vUv;

void main(void) {
  vPosition = position;
  vUv = uv;
}
