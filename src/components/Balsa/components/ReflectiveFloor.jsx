import { MeshReflectorMaterial, Reflector } from "@react-three/drei";
import { useState } from "react";
import { useImperativeHandle, forwardRef } from "react";

const ReflectiveFloor = (props, ref) => {
  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  return (
    <>
      <mesh
        position={[0, -0.7, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={10}
      >
        <planeGeometry />
        <MeshReflectorMaterial
          color={"#080808"}
          resolution={256}
          mixStrength={75}
          blur={[512, 256]}
          mixBlur={1}
        />
      </mesh>
    </>
  );
};

export default ReflectiveFloor;
