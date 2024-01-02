import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";

export function Arm(props) {
  const { nodes } = useGLTF("models/studi_ruka.glb");
  const mask = useTexture(props.mask);
  const emissionIntensity = useRef();

  let time = 0;

  useEffect(() => {
    console.log(emissionIntensity.current.material.emissionIntensity);
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["333001"].geometry}
        // position={[0.237, 1.582, 0.021]}
        // rotation={[Math.PI / 2, 0, 0]}
        ref={emissionIntensity}
        // scale={0.05}
      >
        <meshStandardMaterial
          color={"gray"}
          emissiveMap={mask}
          roughness={0.2}
          metalness={1}
          emissive={"white"}
        />
      </mesh>
    </group>
  );
}
export default Arm;
useGLTF.preload("models/studi_ruka.glb");
