import { useEffect, useRef } from "react";

export const useController = () => {
  const controller = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Handling key events
  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        controller.current.forward = true;
        break;
      case "ArrowDown":
        controller.current.backward = true;
        break;
      case "ArrowLeft":
        controller.current.left = true;
        break;
      case "ArrowRight":
        controller.current.right = true;
        break;
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        controller.current.forward = false;
        break;
      case "ArrowDown":
        controller.current.backward = false;
        break;
      case "ArrowLeft":
        controller.current.left = false;
        break;
      case "ArrowRight":
        controller.current.right = false;
        break;
    }
  };

  return controller;
};
