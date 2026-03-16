import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let width = window.innerWidth, height = window.innerHeight;
let canvas = document.getElementById("c");


// init

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);

const material = new THREE.MeshNormalMaterial();

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(new THREE.Color(0xffffff)); // hex for white
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// animation
//camera.position.set(new THREE.Vector3(4.5293, -7.8311, 0.61847));
camera.position.z = 1;
//camera.rotation.set(new THREE.Vector3(87.353, -0.64506, 13.816));
camera.lookAt(new THREE.Vector3(0, 0, 0))

camera.position.set(2.6547585959750655, 0.8152618946686154, 2.9230511497018643);
//camera.rotation.set(
camera.rotation.x = -0.08751335700035043;
camera.rotation.y = 0.2524313075800641;
camera.rotation.z = 0.021909707661728214;

const loader = new OBJLoader();
let object;
loader.load('3d/island.obj', function (gltf) {
    console.log(gltf);
    object = gltf.scene;
    scene.add(gltf);
},
    undefined,
    function (error) {
        console.error(error);
    }
);
//const controls = new OrbitControls(camera, renderer.domElement);

function animate(time) {
    //controls.update();
    console.log(camera.rotation);
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;
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