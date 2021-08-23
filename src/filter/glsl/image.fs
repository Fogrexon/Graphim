varying mediump vec4 vPosition;
varying mediump vec2 vUv;

uniform sampler2D renderTexture;

void main(void) {
  gl_FragColor = texture2D(renderTexture, vUv);
}
