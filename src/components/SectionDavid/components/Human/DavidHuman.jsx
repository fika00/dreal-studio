import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import albedo from "/models/textures/DavidHuman/human-albedo.jpg";
import metalness from "/models/textures/DavidHuman/human-metalness.jpg";
import normal from "/models/textures/DavidHuman/human-nm.jpg";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function DavidHuman(props) {
  const loader = new TextureLoader();
  const { nodes, materials } = useGLTF("models/DadoHuman.glb");
  const al = loader.load(albedo);
  const met = loader.load(metalness);
  const nm = loader.load(normal);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ch36.geometry}
        // material={nodes.Ch36.material}
      >
        {/* <meshBasicMaterial map={al} /> */}
        <meshPhysicalMaterial
          map={al}
          normalMap={nm}
          metalnessMap={met}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("models/DadoHuman.glb");
