uniform float blockSize;

vec4 getTex(vec2 uv) {
  return texture2D(renderTexture, uv / resolution);
}

vec4 getPixel(vec2 uv) {
  vec2 base = floor(uv / blockSize) * blockSize;
  return (
    getTex(base)
    + getTex(base + vec2(blockSize, 0.0))
    + getTex(base + vec2(0.0, blockSize))
    + getTex(base + vec2(blockSize, blockSize))
  ) * 0.25;
}

void main() {
  vec2 pos = vUv * resolution;
  gl_FragColor = getPixel(pos);
}

