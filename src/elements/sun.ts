import { SphereGeometry, Mesh, MeshBasicMaterial, PointLight } from "three";

export const getSun = () => {
  // Create a sphere to represent the sun visually
  const sunGeometry = new SphereGeometry(1, 32, 32); // Adjust size as needed
  const sunMaterial = new MeshBasicMaterial({ color: 0xffff00 });
  const sunMesh = new Mesh(sunGeometry, sunMaterial);

  // Position the visual sun in the same position as the light source
  sunMesh.position.set(8, 10, -5);

  return sunMesh;
};

export const getSunLight = () => {
  // Create a point light to represent the sun
  const sunLight = new PointLight(0xffff00, 1.5, 500);
  sunLight.position.set(8, 10, -5);

  return sunLight;
};
