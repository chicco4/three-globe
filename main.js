import "./style.css";
import gsap from "gsap";
import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";
import { Float32BufferAttribute, TubeGeometry } from "three";
import globe from "./assets/earth.jpg"

//mouse interaction
let mouse = {
  x: undefined,
  y: undefined,
};

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = (event.clientY / innerHeight) * 2 - 1;
});

//setting scene and render
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
      value: new THREE.TextureLoader().load(globe),
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

//create stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  let x = (Math.random() - 0.5) * 2000;
  let y = (Math.random() - 0.5) * 2000;
  let z = -Math.random() * 2000;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

//animation
camera.position.z = 12;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  sphere.rotation.y += 0.002;
  gsap.to(group.rotation, {
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2,
  });
}

animate();
