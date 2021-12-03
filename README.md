# Graphim

This library is for image effect by WebGL

## Build

```
npm i
npm run build
```

## Install

on npm

```
npm install --save graphim
```

## Use

### Script tag

copy build/umd/graphim.js

```html
<script src="./{path}/graphim.js">
```

### npm

```
npm install --save graphim
```

```javascript
import * as Graphim from 'graphim';
```

### Example

```javascript
// Renderer
const renderer = new Graphim.Renderer({
  image: img, // image: HTMLImageElement
});

// set new image
renderer.setImage(image);

// Uniform
const uni = new Graphim.UniformSetter();
uni.set('delta', new Graphim.Vector2(0.1, 0.2));
// built-in uniform types
// uni.set('name', new Graphim.Vector2(x, y));                    // vec2
// uni.set('name', new Graphim.Vector3(x, y, z));                 // vec3
// uni.set('name', new Graphim.Vector4(x, y, z, w));              // vec4
// uni.set('name', new Graphim.Color(r, g, b, a));                // vec4
// uni.set('name', new Graphim.Matrix4([/* 4x4 number list */])); // mat4
// uni.set('name', new Graphim.Float(x));                         // float
// uni.set('name', new Graphim.Int(x));                           // int

// Filter
const filter = new Graphim.Filter(
  `
uniform vec2 delta;
void main(void) {
  gl_FragColor = texture2D(renderTexture, vUv + sin(time) * distance(vUv, vec2(0.5, 0.5)) * delta);
}
  `,
  uni
);

// set new shader
filter.setShader(newShader, uniform?);

// connect input node
const input = new Graphim.DefaultInput();
filter.connect(input);

// render
renderer.animate(filter);
// render once
// renderer.render(filter);
```

for more details, see examples.

## default shader variables

```glsl
precision mediump float;
// vertex pos (-1 ~ 1)
varying vec4 vPosition;
// uv
varying vec2 vUv;

// before frame buffer
uniform sampler2D renderTexture;
// time
uniform float time;
// canvas resolution
uniform vec2 resolution;
// mouse pos (0 ~ 1)
uniform vec2 mouse;
// hover on canvas
uniform int isHover;
```

## Documents

https://fogrexon.github.io/Graphim/docs/index.html

## Demos

https://fogrexon.github.io/Graphim/examples/index.html

## Author

Fogrexon
