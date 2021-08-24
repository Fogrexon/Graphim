void main() {
  vec4 col = texture2D(renderTexture, vUv);
  gl_FragColor = vec4(vec3(1.0) - col.rgb, col.a);
}
