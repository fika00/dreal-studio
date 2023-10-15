import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function DavidHuman(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/HumanV2.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Ch36"
          castShadow
          receiveShadow
          geometry={nodes.Ch36.geometry}
          // material={materials["03 - Default"]}
        >
          <meshStandardMaterial
            color={"white"}
            roughness={0.11}
            metalness={0.9}
            envMapIntensity={1}
          />
        </mesh>
      </group>
    </group>
  );
}

export default DavidHuman;

useGLTF.preload("models/HumanV2.glb");
