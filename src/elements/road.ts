import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";

export const getRoad = (width: number) => {
  const roadGeometry = new PlaneGeometry(width, 10000); // Width and length of the road
  const roadMaterial = new MeshBasicMaterial({ color: 0x808080 }); // Grey color for the road
  const road = new Mesh(roadGeometry, roadMaterial);

  road.rotation.x = -Math.PI / 2; // Rotate the plane to be flat on the X-axis
  road.position.y = 0; // Position it half the car's height below the car so it looks like it's sitting on the road

  return road;
};
