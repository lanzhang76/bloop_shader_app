var vert_code = [
  '#version 300 es',
  'uniform float time;',
  'varying vec2 vUv;',
  'void main() {',
  '  vUv = uv;',
  '  vec3 transformed = vec3(position);',
  '  transformed.x = position.x + sin(position.y*1.6 + time*0.1)*0.2;',
  '  gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );',
  '}',
].join('\n');
