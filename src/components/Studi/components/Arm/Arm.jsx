import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import ArmFragment from "../shaders/ArmFragment.glsl";
import ArmVertex from "../shaders/ArmVertex.glsl";

import { useThree } from "@react-three/fiber";

export function Arm(props) {
  const { nodes } = useGLTF("models/studi_ruka.glb");
  const mask = useTexture(props.mask);
  const armRef = useRef();
  const { camera } = useThree();

  useFrame((state, delta) => {
    armRef.current.material.uniforms.uTime.value += 1 * delta;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["333001"].geometry}
        ref={armRef}
      >
        <shaderMaterial
          fragmentShader={ArmFragment}
          vertexShader={ArmVertex}
          // wireframe
          uniforms={{
            uTatooMask: { value: mask },
            uTime: { value: 0 },
          }}
        />
      </mesh>
    </group>
  );
}
export default Arm;
useGLTF.preload("models/studi_ruka.glb");
