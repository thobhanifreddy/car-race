import { useEffect } from "react";
import { PerspectiveCamera, WebGLRenderer } from "three";

export const useRenderer = (camera: PerspectiveCamera) => {
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  });

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  return renderer;
};
