import "./style.css";
// Option 1: Import the entire three.js core library.
import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//create sphere
const sGeometry = new THREE.SphereGeometry(5, 50, 50);
const sMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new THREE.TextureLoader().load("./assets/earth.jpg"),
    },
  },
});
const sphere = new THREE.Mesh(sGeometry, sMaterial);

//create atmosphere
const aGeometry = new THREE.SphereGeometry(5, 50, 50);
const aMaterial = new THREE.ShaderMaterial({
  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
});
const atmosphere = new THREE.Mesh(aGeometry, aMaterial);

atmosphere.scale.set(1.1, 1.1, 1.1);

scene.add(atmosphere);
const group = new THREE.Group();
group.add(sphere);
scene.add(group);

let mouse = {
  x: undefined,
  y: undefined,
};

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = (event.clientY / innerHeight) * 2 - 1;
});

//animation
camera.position.z = 12;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  sphere.rotation.y += 0.001;
  group.rotation.y = mouse.x * 0.5;
}

animate();
