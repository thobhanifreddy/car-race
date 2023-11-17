import { useEffect, useRef } from "react";
import { AxesHelper, Mesh, Scene, Vector3 } from "three";
import { getCamera } from "../camera";
import { getCar } from "../elements/car";
import { getRoad } from "../elements/road";
import { useController } from "../useController";
import { useRenderer } from "../useRenderer";

const roadWidth = 5; // The width of the road
const boundaryLeft = -roadWidth / 2; // The left boundary of the road
const boundaryRight = roadWidth / 2; // The right boundary of the road

const CarScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<Mesh>(new Mesh());

  const controller = useController();

  const camera = getCamera(new Vector3(0, 5, 2));

  const road = getRoad(roadWidth, 100);
  const car = getCar(1, 0.5, 3, 0x00ff00);

  const renderer = useRenderer(camera);

  const animate = (scene: Scene) => {
    requestAnimationFrame(() => animate(scene));

    // Update car position based on state
    if (controller.current.forward) carRef.current.position.z -= 0.01;
    if (controller.current.backward) carRef.current.position.z += 0.01;
    if (controller.current.left) carRef.current.position.x -= 0.01;
    if (controller.current.right) carRef.current.position.x += 0.01;

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

  useEffect(() => {
    // Scene
    const scene = new Scene();

    // Axes Helper
    const axesHelper = new AxesHelper(10);
    scene.add(axesHelper);

    scene.add(car);
    carRef.current = car; // Reference the car
    carRef.current.position.set(0, 0, 0);

    scene.add(road);
    mountRef.current?.appendChild(renderer.domElement);

    animate(scene);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default CarScene;
