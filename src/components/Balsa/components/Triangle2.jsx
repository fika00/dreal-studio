import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ScrollControls, useGLTF, useScroll } from "@react-three/drei";
import { TextureLoader } from "three";

import contentTriangleFragment from "./shaders/contentTriangleFragment.glsl";
import contentTriangleVertex from "./shaders/contentTriangleVertex.glsl";

//? Content imports

import triangle_pattern from "/imgs/balsa/triangle_pattern2.jpg";
import image1 from "/imgs/balsa/content/image0.jpg";

export function Triangle2(props) {
  const { nodes, materials } = useGLTF("/models/Triangle2.glb");

  const triangleRef = useRef();

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  const loader = new TextureLoader();
  const content1Image = loader.load(image1);
  const triangle_pattern_texture = loader.load(triangle_pattern);

  useFrame(() => {
    triangleRef.current.rotation.y += 0.005;

    triangleRef.current.material.uniforms.uTime.value += 0.005;
    triangleRef.current.material.uniforms.uTimePattern.value += 0.005;

    // if (triangleRef.current.material.uniforms.uTimePattern.value >= 1) {
    //   triangleRef.current.material.uniforms.uTimePattern.value = 0.0;
    // }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        scale={props.triangleScale}
        ref={triangleRef}
        position={[0, 0, -5]}
        rotation={[degToRad(90), 0, 0]}
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        // depthWrite={false}
      >
        <shaderMaterial
          fragmentShader={contentTriangleFragment}
          vertexShader={contentTriangleVertex}
          transparent
          uniforms={{
            uTime: { value: 0 },
            image: { value: content1Image },
            uTimePattern: { value: 0 },
            trianglePattern: { value: triangle_pattern_texture },
          }}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Triangle2.glb");
