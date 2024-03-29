import * as THREE from "/node_modules/three/build/three.module.js";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

//global declaration
let scene;
let camera;
let renderer;
const canvas = document.getElementById("webgl");
scene = new THREE.Scene();
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

//camera
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
camera.position.x = 0;
scene.add(camera);

//default renderer
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0.0);

//bloom renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

//sun object
const color = new THREE.Color("#FDB813");
const geometry = new THREE.IcosahedronGeometry(1, 15);
const material = new THREE.MeshBasicMaterial({ color: color });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
sphere.layers.set(1);
scene.add(sphere);

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture("texture/galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.layers.set(1);
scene.add(starMesh);

//ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientlight);

//resize listner
window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

const animate = () => {
  requestAnimationFrame(animate);

  // Definir rangos para los parámetros del UnrealBloomPass
  const minThreshold = 0.1;
  const maxThreshold = 0.9;
  const minStrength = 1.0;
  const maxStrength = 3.0;
  const minRadius = 0.2;
  const maxRadius = 0.8;

  // Generar cambios suaves dentro de los rangos
  bloomPass.threshold += Math.random() * 0.02 - 0.01; // Cambio suave
  bloomPass.threshold = THREE.MathUtils.clamp(
    bloomPass.threshold,
    minThreshold,
    maxThreshold
  );

  bloomPass.strength += Math.random() * 0.04 - 0.02; // Cambio suave
  bloomPass.strength = THREE.MathUtils.clamp(
    bloomPass.strength,
    minStrength,
    maxStrength
  );

  bloomPass.radius += Math.random() * 0.04 - 0.02; // Cambio suave
  bloomPass.radius = THREE.MathUtils.clamp(
    bloomPass.radius,
    minRadius,
    maxRadius
  );

  starMesh.rotation.y += 0.001;
  camera.layers.set(1);
  bloomComposer.render();
};

animate();
