```glsl
// ~PURPLE STATIC~

#version 300 es
precision highp float;

float rand(vec2 co) {
  return fract(sin(dot(co.xy , vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 pos = vUv;
  float c = rand(pos.xy * 0.001);
  out_FragColor = vec4(vec3(c, 0., c), 1.0);
```

```glsl
// !SPIKES!

#version 300 es
precision highp float

void main() {
  vec2 pos = vUv;
  float line = 0.5;
  line += mod(pos.x, 0.5);

  float c = step(line, pos.y)
  out_FragColor = vec4(vec3(c), 1.0)
}
```
