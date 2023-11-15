import { useEffect, useRef } from "react";
import * as THREE from "three";

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
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Car Geometry
    const geometry = new THREE.BoxGeometry(1, 0.5, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false,
    });
    const car = new THREE.Mesh(geometry, material);
    scene.add(car);
    carRef.current = car; // Reference the car

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
