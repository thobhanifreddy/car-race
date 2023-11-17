import { useRef } from "react";
import {
  BoxGeometry,
  ColorRepresentation,
  CylinderGeometry,
  Mesh,
  Group,
  MeshPhongMaterial,
  Vector3,
  BufferGeometry,
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
  const carRef = useRef<Group>(new Group());

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
  const car = new Group();
  const carBody = getCarBody(width, height, depth, color);
  car.add(carBody);
  addCarWheel(car);
  return car;
};

const getCarBody = (
  width: number,
  height: number,
  depth: number,
  color: ColorRepresentation
) => {
  const bodyGeometry = new BoxGeometry(width, height, depth);
  const bodyMaterial = new MeshPhongMaterial({ color });
  const body = new Mesh(bodyGeometry, bodyMaterial);
  return body;
};

const addCarWheel = (car: Group) => {
  const carBody = car.children[0] as Mesh;
  const carBodyGeometry = carBody.geometry as BufferGeometry;

  // Compute the bounding box to get dimensions
  carBodyGeometry.computeBoundingBox();
  const size = new Vector3();
  carBodyGeometry.boundingBox?.getSize(size);

  const width = size.x;
  const depth = size.z;

  const wheelPositions = [
    // Front wheels
    new Vector3(width / 2, -0.25, depth / 2),
    new Vector3(-width / 2, -0.25, depth / 2),
    // Back wheels
    new Vector3(width / 2, -0.25, -depth / 2),
    new Vector3(-width / 2, -0.25, -depth / 2),
  ];
  wheelPositions.forEach((position) => {
    const wheel = createWheel();
    wheel.position.copy(position);
    car.add(wheel);
  });
};

const createWheel = () => {
  const wheelGeometry = new CylinderGeometry(0.2, 0.2, 0.1, 32);
  const wheelMaterial = new MeshPhongMaterial({ color: 0x000000 });
  const wheel = new Mesh(wheelGeometry, wheelMaterial);
  wheel.rotation.x = Math.PI / 2; // Rotate the wheel to be perpendicular to the car
  return wheel;
};
