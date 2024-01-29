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
renderer.shadowMap.enabled = true; // Enable shadow map rendering
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows for smoother edges
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
floor.receiveShadow = true; // Enable shadow receiving
scene.add(floor);

// Load monitor
let monitor;
const monitorLoader = new GLTFLoader();
monitorLoader.load("/GamingMoniter.glb", function (monitorModel) {
  monitor = monitorModel.scene;
  monitor.position.set(1, 0.01, -0.7); // Adjust position as needed
  monitor.scale.set(2.8, 2.8, 2.8); // Scale up the monitor
  configureObjectShadows(monitor);
  scene.add(monitor);
});

// Load PC
let pc;
const pcLoader = new GLTFLoader();
pcLoader.load("/mac_pro.glb", function (pcModel) {
  pc = pcModel.scene;
  pc.position.set(-1.5, 0.1, 0); // Adjust position as needed
  pc.scale.set(2, 2, 2); // Scale down the PC
  configureObjectShadows(pc);
  scene.add(pc);
});

// Load keyboard
let keyboard;
const keyboardLoader = new GLTFLoader();
keyboardLoader.load("/pc_keyboard.glb", function (keyboardModel) {
  keyboard = keyboardModel.scene;
  keyboard.position.set(1.5, -0.5, 1); // Adjust position as needed
  keyboard.scale.set(5, 5, 5); // Scale down the keyboard
  configureObjectShadows(keyboard);
  scene.add(keyboard);
});

// Load mouse
let mouse;
const mouseLoader = new GLTFLoader();
mouseLoader.load("/razer_mouse.glb", function (mouseModel) {
  mouse = mouseModel.scene;
  mouse.position.set(3, 0.1, 1.5); // Adjust position as needed
  mouse.scale.set(0.008, 0.008, 0.008); // Scale down the mouse
  mouse.rotation.y = Math.PI / 2;
  configureObjectShadows(mouse);
  scene.add(mouse);
});

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0); // Adjust target position as needed
controls.update();

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Increase intensity
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increase intensity
directionalLight.position.set(0, 1, 1);
directionalLight.castShadow = true; // Enable shadow casting
scene.add(directionalLight);

// Add hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.8); // Increase intensity
scene.add(hemisphereLight);

// Configure shadow properties for directional light
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.1; // Adjust near value for better shadow quality
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.camera.left = -5; // Adjust the frustum size
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;

// Helper function to configure object shadows
function configureObjectShadows(object) {
  object.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
