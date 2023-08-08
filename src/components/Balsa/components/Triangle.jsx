import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Triangle(props) {
  const degToRad = (deg) => {
    return deg * 0.0174533;
  };
  const { nodes, materials } = useGLTF("./models/Triangle.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        rotation={[0, degToRad(180), 0]}
        castShadow
        receiveShadow
        geometry={nodes.BezierCircle.geometry}
      >
        {props.material}
      </mesh>
    </group>
  );
}

export default Triangle;

useGLTF.preload("./models/Triangle.glb");
