#pragma glslify: random = require("./lib/random.glsl")

uniform float randomSize;

vec4 getTex(vec2 uv) {
  return texture2D(renderTexture, uv / resolution);
}

void main() {
  vec2 pos = vUv * resolution;
  gl_FragColor = getTex(
    pos + (
      vec2(
        random(vUv), random(vUv + vec2(1.0))
      ) * 2.0 - vec2(1.0)) * randomSize
    );
}

