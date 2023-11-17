import { Mesh, MeshPhongMaterial, SphereGeometry, Group } from "three";

const createCloud = () => {
  const cloudGeometry = new SphereGeometry(5, 32, 32); // Size of each cloud
  const cloudMaterial = new MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  });
  const cloud = new Mesh(cloudGeometry, cloudMaterial);
  return cloud;
};

export const addCloudsToSky = (numberOfClouds: number) => {
  const clouds = new Group();
  const skyRadius = 500;

  for (let i = 0; i < numberOfClouds; i++) {
    const cloud = createCloud();

    // Random position inside the sky sphere
    const theta = Math.random() * Math.PI * 2; // Random angle
    const phi = Math.acos(Math.random() * 2 - 1); // Random inclination
    const r = skyRadius * Math.sqrt(Math.random()); // Random radius

    cloud.position.setFromSphericalCoords(r, phi, theta);
    cloud.position.y += skyRadius / 2; // Offset the y position to only spawn above the horizon

    clouds.add(cloud);
  }

  return clouds;
};
