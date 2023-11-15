import { useEffect, useRef } from "react";
import * as THREE from "three";

const roadWidth = 5; // The width of the road
const boundaryLeft = -roadWidth / 2; // The left boundary of the road
const boundaryRight = roadWidth / 2; // The right boundary of the road

const CarScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<THREE.Mesh>(new THREE.Mesh());
  const moveRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    // Adjust the camera position
    camera.position.z = 5; // Closer to the car
    camera.position.y = 2; // Higher than the car

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Road Geometry
    const roadGeometry = new THREE.PlaneGeometry(roadWidth, 100); // Width and length of the road
    const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Grey color for the road
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2; // Rotate the plane to be flat on the X-axis
    road.position.y = -0.5; // Position it half the car's height below the car so it looks like it's sitting on the road
    scene.add(road);

    // Car Geometry
    const geometry = new THREE.BoxGeometry(1, 0.5, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false,
    });
    const car = new THREE.Mesh(geometry, material);
    scene.add(car);
    carRef.current = car; // Reference the car
    carRef.current.position.set(0, 0, 0);

    // Handling key events
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          moveRef.current.forward = true;
          break;
        case "ArrowDown":
          moveRef.current.backward = true;
          break;
        case "ArrowLeft":
          moveRef.current.left = true;
          break;
        case "ArrowRight":
          moveRef.current.right = true;
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          moveRef.current.forward = false;
          break;
        case "ArrowDown":
          moveRef.current.backward = false;
          break;
        case "ArrowLeft":
          moveRef.current.left = false;
          break;
        case "ArrowRight":
          moveRef.current.right = false;
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Render Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update car position based on state
      if (moveRef.current.forward) carRef.current.position.z -= 0.01;
      if (moveRef.current.backward) carRef.current.position.z += 0.01;
      if (moveRef.current.left) carRef.current.position.x -= 0.01;
      if (moveRef.current.right) carRef.current.position.x += 0.01;

      // Check if the car is off the road
      if (
        carRef.current.position.x < boundaryLeft ||
        carRef.current.position.x > boundaryRight
      ) {
        // Car is off the road, reset position
        carRef.current.position.set(0, 0, 0); // Reset the car to the start of the road
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handling
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);

      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default CarScene;
