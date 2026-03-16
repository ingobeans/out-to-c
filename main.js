import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const loader = new THREE.TextureLoader();
const texture = await loader.loadAsync('3d/water2.JPG');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

let width = window.innerWidth, height = window.innerHeight;
let canvas = document.getElementById("c");

// init

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
//const controls = new OrbitControls(camera, renderer.domElement);
let waterShader = new THREE.ShaderMaterial({
    uniforms: {
        buffer: { value: texture },
        time: { type: 'float', value: 0.0 },
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader()
});

renderer.setSize(width, height);
renderer.setClearColor(new THREE.Color(0x3DABFF))

function vertexShader() {
    return `
    uniform float time;
    varying vec2 vUv;

    void main(){
        vUv=position.xz*0.1+.5;
        vec3 c = position;
        c.y += sin(time/1200.0+position.z) * 0.04;

        vec4 modelViewPosition = modelViewMatrix * vec4(c, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
    }
  `
}
function fragmentShader() {
    return `
    precision highp float;

    uniform sampler2D buffer;
    varying vec2 vUv;

    void main(){
        vec4 texel=texture2D(buffer,vUv);
        gl_FragColor=texel;
    }
    `
}
const mtlLoader = new MTLLoader().setPath('3d/');
const objLoader = new OBJLoader().setPath('3d/');

async function loadModel(name, material) {
    const materials = await mtlLoader.loadAsync(name + '.mtl');
    materials.preload();
    if (material != undefined && material != null) {
        console.log(material);
        materials.materials.Material = material;
    }
    objLoader.setMaterials(materials);

    return await objLoader.loadAsync(name + '.obj')
}

let island = await loadModel("island");
scene.add(island);
let water = await loadModel("water", waterShader);

water.position.y = 0.125;
water.rotation.y += 3.14 / 4.0;
scene.add(water);

// lights :>
const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);
const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
scene.add(hemiLight);

renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// set up default camera state
camera.position.set(2.2, 0.8152618946686154, 1.9230511497018643);

// set default camera rotation
camera.rotation.x = -0.08751335700035043;
camera.rotation.y = 0.2524313075800641;
camera.rotation.z = 0.021909707661728214;

function animate(time) {
    waterShader.uniforms["time"].value = time;
    //controls.update();
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.width = width;
    camera.height = height;
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    canvas.width = width + "px";
    canvas.height = height + "px";

    renderer.setSize(width, height);
});