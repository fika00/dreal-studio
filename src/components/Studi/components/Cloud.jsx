import { useTexture } from "@react-three/drei";
import { useState } from "react";

const Cloud = ({ color }) => {
  return (
    <>
      <mesh scale={15} position={[0, 0, 0]}>
        <planeGeometry args={[1.78, 1]} />
        <meshBasicMaterial map={color} transparent={true} />
      </mesh>
    </>
  );
};

export default Cloud;
