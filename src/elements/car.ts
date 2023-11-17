import {
  BoxGeometry,
  ColorRepresentation,
  Mesh,
  MeshBasicMaterial,
} from "three";

export const getCar = (
  width: number,
  height: number,
  depth: number,
  color: ColorRepresentation
) => {
  const carGeometry = new BoxGeometry(width, height, depth);
  const carMaterial = new MeshBasicMaterial({
    color,
    wireframe: false,
  });
  const car = new Mesh(carGeometry, carMaterial);

  return car;
};
