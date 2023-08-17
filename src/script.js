import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const group = new THREE.Group();
scene.add(group);

const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);

group.add(mesh1);

const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
const mesh3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
// mesh.rotation.y = 2;

mesh1.position.x = -2;
mesh3.position.x = 2;

group.add(mesh2);
group.add(mesh3);

group.position.y = 1;
// mesh.position.normalize();

const axesHelper = new THREE.AxesHelper(2);

scene.add(axesHelper);

/**
 * Sizes
 */

const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);

// camera.lookAt(new THREE.Vector3(mesh.position));

// console.log(mesh.position.distanceTo(camera.position));
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();
//   console.log("elapsed time: " + elapsedTime);
//   group.rotation.y = elapsedTime;
//   group.rotation.x = elapsedTime;
//   group.position.y = Math.sin(elapsedTime);
//   camera.lookAt(group.position);
//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };

// tick();
