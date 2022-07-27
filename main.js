import "./style.css";
// Option 1: Import the entire three.js core library.
import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
console.log(vertexShader);
console.log(fragmentShader);

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
const geometry = new THREE.SphereGeometry(5, 50, 50);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture:{
      value: new THREE.TextureLoader().load("./assets/globe.jpeg")
    }
  }
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 12;

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
