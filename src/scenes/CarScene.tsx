import { useCallback, useEffect, useRef } from "react";
import { AxesHelper, DirectionalLight, Scene } from "three";
import { getCamera } from "../camera";
import { getRoad } from "../elements/road";
import { useController } from "../useController";
import { useRenderer } from "../useRenderer";
import { useCar } from "../elements/useCar";
import { getSky } from "../elements/sky";
import { getGround } from "../elements/ground";
import { getSun, getSunLight } from "../elements/sun";
import { addCloudsToSky } from "../elements/clouds";

const roadWidth = 30; // The width of the road
const boundaryLeft = -roadWidth / 2; // The left boundary of the road
const boundaryRight = roadWidth / 2; // The right boundary of the road

const CarScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  const camera = getCamera({ x: 0, y: 5, z: 9 });
  const controller = useController();

  const road = getRoad(roadWidth);
  const sky = getSky();
  const sun = getSun();
  const sunLight = getSunLight();
  const clouds = addCloudsToSky(100);

  const ground = getGround();
  const car = useCar(
    { width: 2, height: 0.5, depth: 1, color: 0x00ff00 },
    { x: 0, y: 0.5, z: 0 }
  );

  const renderer = useRenderer(camera);

  // Axes Helper

  const animate = useCallback(
    (scene: Scene) => {
      requestAnimationFrame(() => animate(scene));

      // Update car position based on state
      if (controller.forward) car.position.z -= 0.01;
      if (controller.backward) car.position.z += 0.01;
      if (controller.left) car.position.x -= 0.01;
      if (controller.right) car.position.x += 0.01;

      // Check if the car is off the road
      if (car.position.x < boundaryLeft || car.position.x > boundaryRight) {
        // Car is off the road, reset position
        car.position.set(0, 0, 0); // Reset the car to the start of the road
      }

      renderer.render(scene, camera);
    },
    [camera, car, controller, renderer]
  );

  useEffect(() => {
    // Scene
    const scene = new Scene();

    const axesHelper = new AxesHelper(10);
    scene.add(axesHelper);

    const light = new DirectionalLight(0xffffff, 1); // color, intensity
    light.position.set(1, 1, 1); // position the light
    scene.add(light);

    scene.add(car);

    scene.add(sky);
    scene.add(sun);
    scene.add(sunLight);
    scene.add(clouds);

    scene.add(ground);
    scene.add(road);

    mountRef.current?.appendChild(renderer.domElement);

    animate(scene);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [animate, car, renderer.domElement, road]);

  return <div ref={mountRef} />;
};

export default CarScene;
