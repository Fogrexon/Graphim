void main() {
  vec4 col = texture2D(renderTexture, vUv);
  gl_FragColor = vec4(
    col.r * 0.393 + col.g * 0.769 + col.b * 0.189,
    col.r * 0.349 + col.g * 0.686 + col.b * 0.168,
    col.r * 0.272 + col.g * 0.534 + col.b * 0.131,
    col.a);
}
