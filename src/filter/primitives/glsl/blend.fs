uniform float blend;
void main() {
  vec4 col1 = texture2D(renderTexture, vUv);
  vec4 col2 = texture2D(renderTexture2, vUv);
  gl_FragColor = mix(col1, col2, blend);
}