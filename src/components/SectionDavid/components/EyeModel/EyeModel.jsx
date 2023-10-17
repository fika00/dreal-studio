import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { DoubleSide } from "three";
import { editable as e } from "@theatre/r3f";
import { useFrame } from "@react-three/fiber";

export function EyeModel(props) {
  const { nodes, materials } = useGLTF("models/eye_svg.glb");
  const mesh1Ref = useRef();
  const mesh2Ref = useRef();

  let t = 0;

  useFrame((state, delta) => {
    t += 1 * delta;
    const sin = Math.sin(t);
  });

  return (
    <group
      {...props}
      dispose={null}
      scale={10}
      position={[-1.195, -2.122, 5.423]}
      rotation={[-1.05, -3, 0]}
      theatreKey="EyeModel"
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve001_1.geometry}
        // material={materials["SVGMat.002"]}
        ref={mesh1Ref}
      >
        <meshStandardMaterial
          side={DoubleSide}
          color={"white"}
          roughness={0.11}
          metalness={0.9}
          envMapIntensity={10}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        ref={mesh2Ref}
        geometry={nodes.Curve001_2.geometry}
      >
        <meshStandardMaterial
          side={DoubleSide}
          color={"white"}
          roughness={0.11}
          metalness={0.9}
          envMapIntensity={10}
        />
      </mesh>
    </group>
  );
}

export default EyeModel;

useGLTF.preload("models/eye_svg.glb");
