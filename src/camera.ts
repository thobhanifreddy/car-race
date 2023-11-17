import { PerspectiveCamera, Vector3 } from "three";

export const getCamera = (initialPostion: Vector3) => {
  // Camera
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  // Adjust the camera position
  camera.position.x = initialPostion.x; // Closer to the car
  camera.position.y = initialPostion.y; // Higher than the car
  camera.position.z = initialPostion.z; // Closer to the car

  return camera;
};
