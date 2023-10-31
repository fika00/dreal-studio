import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const CameraRig = () => {
  const camMovementRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rotationSpeed = 0.00005;

      targetX.current = -(event.clientX - dimensions.width / 2) * rotationSpeed;

      targetY.current =
        -(event.clientY - dimensions.height / 2) * rotationSpeed;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const rotationSpeed = 0.005;

    camMovementRef.current.rotation.y +=
      (targetX.current - camMovementRef.current.rotation.y) * rotationSpeed;
    camMovementRef.current.rotation.x +=
      (targetY.current - camMovementRef.current.rotation.x) * rotationSpeed;
  });

  return <PerspectiveCamera fov={45} makeDefault ref={camMovementRef} />;
};

export default CameraRig;
