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

## Simple color gradient

```glsl
#version 300 es
precision highp float;

uniform float time;
out vec4 out_FragColor;
varying vec2 vUv;

void main() {
  vec2 pos = vUv;
  vec3 color = vec3(vUv.x,vUv.y,abs(sin(time * 0.3)));
  out_FragColor = vec4( color, 1.0 );
}
```

## Blink

```glsl
#version 300 es
precision highp float;

uniform float time;
out vec4 out_FragColor;
varying vec2 vUv;

void main() {
	out_FragColor = vec4(1.0,1.0,abs(sin(time / 5.)),1.0);
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

## grid-iant~

```glsl
#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;
out vec4 out_FragColor;
varying vec2 vUv;


void main() {
  vec2 pos = vUv;
  float y = fract(pos.y*40.);
  y *= fract(pos.x*40.);
  vec3 color = vec3(y,y,abs(sin(time* 0.03)));
  out_FragColor = vec4(color, 1.0);
}
```

## Checker board

```glsl
#version 300 es
precision highp float;

out vec4 out_FragColor;
uniform float time;
varying vec2 vUv;

void main() {
  vec2 pos = vUv;
  float x = floor(pos.x / .01);
  float y = floor(pos.y / .01);
  float g = mod(x + y, 2.0);

  out_FragColor = vec4(g, g, g, 1.0);
}
```

## Polka dots

```glsl
#version 300 es
precision highp float;

out vec4 out_FragColor;
uniform float time;
varying vec2 vUv;

void main() {
  vec2 pos = vUv;
  vec2 f = fract(pos.xy / vec2(.05, .05));
  float d = distance(vec2(0.5, 0.5), f);
  float g = step(0.3, d);
  out_FragColor = vec4(g, g, g, 1.0);
}
```

## Flat mask

```glsl
#version 300 es
precision highp float;

out vec4 out_FragColor;
uniform float time;
varying vec2 vUv;

void main() {
  vec2 pos = vUv;
  vec2 f = fract(gl_FragCoord.xy / vec2(50., 50.));
  float d = distance(vec2(0.5, 0.5), f);
  float g = step(0.3, d);
  out_FragColor = vec4(g, g, g, 1.0);
}
```

## Flat dots

```glsl
#version 300 es
precision highp float;

out vec4 out_FragColor;
uniform float time;
varying vec2 vUv;

void main() {
  vec2 pos = vUv;
  vec2 f = fract(gl_FragCoord.xy / vec2(5., 5.));
  float d = distance(vec2(0.5, 0.5), f);
  float g = step(0.5, d);
  out_FragColor = vec4(g, g, g, 1.0);
}
```


## Square crazy - from Shader workshop
#version 300 es
precision highp float;

out vec4 out_FragColor;
uniform float time;
varying vec2 vUv;

void main() {
```glsl
float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float circle(vec2 frag_coord, float radius) {
    return length(frag_coord) - radius;
}
void main() {
  vec2 pos = vUv;
  float y = fract(pos.y*0.1);
  y *= fract(pos.x*40.);
 float c = random(pos.xy * 0.01);
  vec3 color = vec3(y,c,abs(sin(time* 0.03)));
  out_FragColor = vec4(color, 1.0);
out_FragColor += .5 - random(floor((vUv + time) * 10.0));

}
```

## Silver lining - from Shader workshop
```glsl
#version 300 es
precision highp float;

#define TWO_PI 6.28318530718
uniform vec2 resolution;
uniform float time;
out vec4 out_FragColor;
varying vec2 vUv;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float circle(vec2 frag_coord, float radius) {
    return length(frag_coord) - radius;
}
void pR(inout vec2 p, float a) {
    p = cos(a)*p + sin(a)*vec2(p.y, - abs(cos(p.x)));
}

void main() {
  vec2 pos = vUv;
  pR(pos, .001);
  float y = fract(pos.y*0.1);
  y /= cos((sin(time) * 0.5 + 0.5) * 1.3) * 0.4 * fract(sin(time*.3) - pos.x*4.);
  float c = random(pos.xy * 0.00001);
  out_FragColor = vec4(y, c, .5, 1.0);
  out_FragColor *= vec4(1.0, 0.0, 1.0, 1.0);
  out_FragColor.rgb = out_FragColor.rgb*.2 + vec3(out_FragColor.r + out_FragColor.g + out_FragColor.b) * .33;
```