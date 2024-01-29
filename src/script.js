import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Set up the scene
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

// Set initial camera position
camera.position.set(0, 2, 10);

// Create floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x808080,
  side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
scene.add(floor);

// Create monitor
let monitor;
const monitorLoader = new GLTFLoader();
monitorLoader.load("/GamingMoniter.glb", function (monitorModel) {
  monitor = monitorModel.scene;
  monitor.position.set(1, 0.01, -0.7); // Adjust position as needed
  monitor.scale.set(2.8, 2.8, 2.8); // Scale up the monitor
  scene.add(monitor);
});

// Create PC (placeholder as a box)
const pcGeometry = new THREE.BoxGeometry(1, 0.75, 1);
const pcMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const pc = new THREE.Mesh(pcGeometry, pcMaterial);
pc.position.set(-1, 0.8, 0); // Adjust position as needed
pc.scale.set(0.75, 4, 2); // Scale down the PC
scene.add(pc);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0); // Adjust target position as needed
controls.update();

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Add hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
scene.add(hemisphereLight);

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the whole scene
  scene.rotation.y += 0.01; // Adjust rotation speed as needed

  renderer.render(scene, camera);
}

animate();
