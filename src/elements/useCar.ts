import { useRef } from "react";
import {
  BoxGeometry,
  ColorRepresentation,
  Mesh,
  MeshBasicMaterial,
} from "three";

type CarGeometry = {
  width: number;
  height: number;
  depth: number;
  color: ColorRepresentation;
};

type CarPosition = {
  x: number;
  y: number;
  z: number;
};

export const useCar = (geometry: CarGeometry, position: CarPosition) => {
  const carRef = useRef<Mesh>(new Mesh());

  const car = getCar(
    geometry.width,
    geometry.height,
    geometry.depth,
    geometry.color
  );
  carRef.current = car; // Reference the car
  carRef.current.position.set(position.x, position.y, position.z); // Set the car's position

  return carRef.current;
};

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
