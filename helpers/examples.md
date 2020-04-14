# Example GLSL code

## Just red

```glsl
#version 300 es
precision highp float;

uniform float time;
out vec4 out_FragColor;

void main() {
   out_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
```

## Swirl

```glsl
#version 300 es
precision highp float;

uniform float time;
out vec4 out_FragColor;
varying vec2 vUv;

void main() {
    vec2 pos = vUv;
    float d = distance(vec2(1.0, 1.0), pos.xy);
    float c = step(.02, mod(d, .04));
    out_FragColor = vec4(c, c, c, 1.0);
}
```

## Purple mesh

```glsl
#version 300 es
precision highp float;

uniform float time;
out vec4 out_FragColor;
varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy , vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 pos = vUv;
  float c = rand(pos.xy * 0.0001);
  out_FragColor = vec4(vec3(c, 0., c), 1.0);
}
```

## Yikes, spikes!

```glsl
#version 300 es
precision highp float;

uniform float time;
out vec4 out_FragColor;
varying vec2 vUv;

void main() {
  vec2 pos = vUv;
  float line = 0.5;
  line += mod(pos.x, .05);

  float c = step(line, pos.y);
  out_FragColor = vec4(c, c, c, 1.0);
}
```

## Fine grain

```glsl
#version 300 es
precision highp float;

uniform float time;
out vec4 out_FragColor;
varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy , vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 pos = vUv;
  float c = abs( sin( pos.x ) );

  vec3 grain = vec3(rand(vec2(pos.xy * 10.)));
  vec3 color = vec3(c, 0., c);

  out_FragColor = vec4(min(grain, color), 1.0);
}
```
