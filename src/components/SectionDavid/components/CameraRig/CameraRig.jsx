import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const CameraRig = () => {
  const cameraRigRef = useRef();
  useFrame(({ mouse }) => {
    // Define the rotation speed (adjust this value as needed)
    const rotationSpeed = 0.4;

    // Calculate the target rotation based on the mouse input
    const targetRotationY = (mouse.x / 3) * rotationSpeed;
    const targetRotationX = (mouse.y / 3) * rotationSpeed * -1;

    // Smoothly interpolate the current rotation towards the target rotation
    cameraRigRef.current.rotation.y -=
      (targetRotationY + cameraRigRef.current.rotation.y) * 0.01;
    cameraRigRef.current.rotation.x -=
      (targetRotationX + cameraRigRef.current.rotation.x) * 0.01;
  });
  return <PerspectiveCamera ref={cameraRigRef} makeDefault />;
};

export default CameraRig;
