import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let width = window.innerWidth, height = window.innerHeight;
let canvas = document.getElementById("c");

// init

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(width, height);
renderer.setClearColor(new THREE.Color(0x3DABFF))
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// set up default camera state
camera.position.set(2.2, 0.8152618946686154, 1.9230511497018643);

// set default camera rotation
camera.rotation.x = -0.08751335700035043;
camera.rotation.y = 0.2524313075800641;
camera.rotation.z = 0.021909707661728214;

const mtlLoader = new MTLLoader().setPath('3d/');
const objLoader = new OBJLoader().setPath('3d/');
async function loadModel(name) {
    const materials = await mtlLoader.loadAsync(name + '.mtl');
    materials.preload();

    objLoader.setMaterials(materials);

    return await objLoader.loadAsync(name + '.obj')
}

let island = await loadModel("island");
scene.add(island);
let water = await loadModel("water");
water.position.y = 0.125;
scene.add(water);

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
scene.add(hemiLight);

//const controls = new OrbitControls(camera, renderer.domElement);

function animate(time) {
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