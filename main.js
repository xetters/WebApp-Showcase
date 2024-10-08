// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set renderer size and add it to the DOM
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry, Material, Mesh
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Position the camera
camera.position.z = 5;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the sphere for animation
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;

  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Update camera position on scroll
window.addEventListener('scroll', onScroll, false);

function onScroll() {
  const scrollY = window.scrollY;
  camera.position.y = scrollY * -0.005; // Adjust the multiplier to your liking
}
