// This JavaScript file is responsible for initializing the Three.js scene and rendering the background.

document.addEventListener('DOMContentLoaded', (event) => {
    
    // Initialize Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    // Set canvas size
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Set the canvas position to fixed and behind other content
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    
    // Insert the canvas as the first child of the body
    document.body.insertBefore(renderer.domElement, document.body.firstChild);

    // Set background color
    scene.background = new THREE.Color(0x111111);

    // Create a grid of lines
    const gridSize = 20;
    const gridSpacing = 2;
    const lines = new THREE.Group();

    // Add lines to the grid
    for (let i = -gridSize; i <= gridSize; i += gridSpacing) {
        // Create horizontal and vertical lines
        const horizontalGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-gridSize, i, 0),
            new THREE.Vector3(gridSize, i, 0)
        ]);
        // Create horizontal and vertical lines
        const verticalGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(i, -gridSize, 0),
            new THREE.Vector3(i, gridSize, 0)
        ]);

        // Add lines to the grid
        const material = new THREE.LineBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.5 });
        const horizontalLine = new THREE.Line(horizontalGeometry, material);
        const verticalLine = new THREE.Line(verticalGeometry, material);
        lines.add(horizontalLine, verticalLine);
    }

    // Add grid to the scene
    scene.add(lines);

    // Position camera
    camera.position.z = 30;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the grid
        lines.rotation.z += 0.002;

        // Pulsate the grid
        const pulseFactor = Math.sin(Date.now() * 0.001) * 0.1 + 0.9;
        lines.scale.set(pulseFactor, pulseFactor, 1);
        renderer.render(scene, camera);
    }

    // Start the animation
    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
});