import { MeshReflectorMaterial } from "@react-three/drei";
import { useState } from "react";
import { useImperativeHandle, forwardRef } from "react";

const ReflectiveFloor = (props, ref) => {
  useImperativeHandle(ref, () => ({
    handleShow,
    handleHide,
  }));

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };
  const [isVisible, setIsVisible] = useState(false);

  const handleShow = () => {
    setIsVisible(true);
  };
  const handleHide = () => {
    setIsVisible(false);
  };
  return (
    <>
      <mesh scale={15} position={[0, -1, 0]} rotation={[degToRad(-90), 0, 0]}>
        <planeGeometry />
        <MeshReflectorMaterial
          color="gray"
          blur={[500, 250]}
          resolution={2024}
          mixBlur={10}
          mixStrength={200}
          metalness={0.999}
          roughness={0.05}
          mirror={0}
          opacity={isVisible ? 1 : 0}
          depthWrite={false}
          transparent
        />
      </mesh>
    </>
  );
};

export default forwardRef(ReflectiveFloor);
