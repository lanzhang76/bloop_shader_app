var frag_code = [
    'void main() {',
    '   vec2 pos = vUv;',
    '   float red = abs( sin( pos.x * pos.y + time / 15.0 ) );',
    '   float green = abs( cos( pos.x * pos.y + time / 14.0 ) );',
    '   float blue = abs( cos( pos.x * pos.y + time / 13.0 ) );',
    '   out_FragColor = vec4( red, green, blue, 1.0 );',
    '}'
].join('\n');

// $("#code_text").attr("placeholder", frag_code);
$("#code_text").html(frag_code);

