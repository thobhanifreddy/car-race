import { BackSide, Mesh, MeshBasicMaterial, SphereGeometry } from "three";

export const getSky = () => {
  const skyGeometry = new SphereGeometry(500, 32, 32); // Large sphere
  const skyMaterial = new MeshBasicMaterial({
    color: 0x87ceeb,
    side: BackSide,
  });

  const sky = new Mesh(skyGeometry, skyMaterial);
  //   sky.renderOrder = -1; // Render it behind anything else
  return sky;
};
