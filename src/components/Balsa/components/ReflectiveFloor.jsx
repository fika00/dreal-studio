import { MeshReflectorMaterial, Reflector } from "@react-three/drei";
import { useState } from "react";
import { useImperativeHandle, forwardRef } from "react";

import floor_roughness from "/imgs/balsa/floor_roughness.jpg";
import floor_metalness from "/imgs/balsa/floor_metalness.jpg";
import floor_nm from "/imgs/balsa/floor_nm.jpg";
import { TextureLoader } from "three";

const ReflectiveFloor = (props, ref) => {
  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  const loader = new TextureLoader();

  const nm = loader.load(floor_nm);
  const roughness = loader.load(floor_metalness);

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
          resolution={512}
          mixStrength={75}
          blur={[720, 720]}
          mixBlur={1}
          // normalMap={nm}
          roughnessMap={roughness}
        />
      </mesh>
    </>
  );
};

export default ReflectiveFloor;
