uniform float threshold;
uniform float strength;
uniform float blur;


float getBrightness(vec3 col) {
  return max(col.r, max(col.g, col.b));
}

vec4 getOriginalTex(vec2 uv) {
  return texture2D(renderTexture, uv / resolution);
}
vec3 getTex(vec2 uv) {
  vec4 col = texture2D(renderTexture, uv / resolution);
  return getBrightness(col.rgb) > threshold ? col.rgb : vec3(0.0);
}

float gauss(vec2 pos) {
  return -exp(-length(pos) * 2.0);
}

vec3 sampleBox(vec2 center) {

  float acc = 0.0;
  vec3 col = vec3(0.0);

  for(float x = -1.0;x < 1.0;x += 0.2) {
    for(float y = -1.0; y < 1.0; y += 0.2) {
      vec2 pos = center + vec2(x, y) * blur;
      float g = gauss(vec2(x, y));
      col += getTex(pos).rgb * g;
      acc += g;
    }
  }
  return col / acc;
}

void main() {
  vec2 pos = vUv * resolution;
  vec4 baseCol = getOriginalTex(pos);
  gl_FragColor = baseCol + vec4(sampleBox(pos), 0.0) * strength;
}

