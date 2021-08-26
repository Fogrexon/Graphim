uniform float strength;

float getBrightness(vec3 col) {
  return max(col.r, max(col.g, col.b));
}

vec4 getTex(vec2 uv) {
  return texture2D(renderTexture, uv / resolution);
}

float gauss(vec2 pos) {
  return -exp(-length(pos) * 2.0);
}

vec4 sampleBox(vec2 center) {

  float acc = 0.0;
  vec4 col = vec4(0);

  for(float x = -1.0;x < 1.0;x += 0.2) {
    for(float y = -1.0; y < 1.0; y += 0.2) {
      vec2 pos = center + vec2(x, y) * strength;
      float g = gauss(vec2(x, y));
      col += getTex(pos) * g;
      acc += g;
    }
  }
  return col / acc;
}

void main() {
  vec2 pos = vUv * resolution;
  gl_FragColor = sampleBox(pos);
}

