import "./style.css";
// Option 1: Import the entire three.js core library.
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//create sphere
const geometry = new THREE.SphereGeometry(5, 50, 50);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 12;

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
