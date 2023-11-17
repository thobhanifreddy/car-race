import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

export const getGround = () => {
  const groundGeometry = new PlaneGeometry(1000, 1000);
  const groundMaterial = new MeshPhongMaterial({ color: 0x228b22 });
  const ground = new Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2; // Rotate to lay flat
  ground.position.y = -0.5;

  return ground;
};
