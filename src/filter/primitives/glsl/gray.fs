void main() {
  vec4 col = texture2D(renderTexture, vUv);
  float gray = col.r * 0.3 + col.g * 0.59 + col.b * 0.11;
  gl_FragColor = vec4(gray, gray, gray, col.a);
}
