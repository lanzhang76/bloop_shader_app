
var scene, camera, canvas, context, renderer, light;
var clock, ambient, geometry, material, sphere;
var mouseX = 0, mouseY = 0;

function init() {
    // set up scene
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    scene.background = new THREE.Color('#cce6ff');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4;


    // create a lighting source:
    var spotLight = new THREE.SpotLight(0xff0000);
    spotLight.position.set(0, 100, 1);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // create geometry
    geometry = new THREE.SphereGeometry(2, 32, 32);


    // declare uniform and set on materials:
    uniform1 = {
        "time": { value: 1.0 }
    };

    material = new THREE.ShaderMaterial({
        uniforms: uniform1,
        fog: true,
        vertexShader: document.getElementById('vs').textContent.trim(),
        fragmentShader: document.getElementById('fs').textContent.trim()
    });
    sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default

    scene.add(sphere);
}



function createRend() {
    //create webGL renderer
    canvas = document.createElement('canvas');
    context = canvas.getContext('webgl2', { alpha: false });
    renderer = new THREE.WebGLRenderer({
        canvas: canvas, context: context
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    render(sphere);
}


function render() {
    var delta = clock.getDelta();
    uniform1["time"].value += delta * 5;
    // sphere.rotation.y += 0.01;
    // sphere.rotation.z += delta * 0.01;
}

init();
createRend();
animate();

// https://threejs.org/examples/?q=webgl#webgl_shader2
