import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

/**
 * debug
 */

const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

/**
 * Texttures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcculsionTexture = textureLoader.load(
  "/textures/door/ambientOcculsion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalNessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughNessTexture = textureLoader.load("/textures/door/roughness.jpg");

const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
const gradianTexture = textureLoader.load("/textures/gradients/3.jpg");
gradianTexture.minFilter = THREE.NearestFilter;
gradianTexture.magFilter = THREE.NearestFilter;
gradianTexture.generateMipmaps = false;

// Scene
const scene = new THREE.Scene();

//Objects

const material = new THREE.MeshStandardMaterial();

material.map = doorColorTexture;
material.normalMap = doorNormalTexture;

gui.add(material, "metalness").min(0).max(1);
gui.add(material, "roughness").min(0).max(1);

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradianTexture;

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100 ;

// material.matcap = matcapTexture;
// material.flatShading = true;

// const material = new THREE.MeshBasicMaterial();

// material.transparent = true;
// material.map = matcapTexture;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), material);
const PlaneGeometry = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 16, 32),
  material
);
PlaneGeometry.position.x = 2;
torus.position.x = -2;

scene.add(sphere);
scene.add(torus);
scene.add(PlaneGeometry);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.x = 4;

scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  125,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update rotation
  sphere.rotation.y = 0.1 * elapsedTime;
  PlaneGeometry.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.1 * elapsedTime;
  PlaneGeometry.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
