import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ScrollControls, useGLTF, useScroll } from "@react-three/drei";
import { TextureLoader } from "three";
import { useImperativeHandle, forwardRef } from "react";

import contentTriangleFragment from "./shaders/contentTriangleFragment.glsl";
import contentTriangleVertex from "./shaders/contentTriangleVertex.glsl";

//? Content imports

import triangle_pattern from "/imgs/balsa/triangle_pattern2.jpg";

const Triangle2 = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    handleAppear,
  }));

  const { nodes, materials } = useGLTF("/models/Triangle2.glb");

  const triangleRef = useRef();

  const scroll = useScroll();

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  const loader = new TextureLoader();
  const image = loader.load(`/imgs/balsa/content/${props.img}`);
  const triangle_pattern_texture = loader.load(triangle_pattern);

  useFrame(() => {
    triangleRef.current.rotation.y += 0.005;

    triangleRef.current.material.uniforms.uTime.value += 0.005;
    triangleRef.current.material.uniforms.uTimePattern.value += 0.005;

    // if (triangleRef.current.material.uniforms.uTimePattern.value >= 1) {
    //   triangleRef.current.material.uniforms.uTimePattern.value = 0.0;
    // }
    if (props.isMain) {
      triangleRef.current.material.uniforms.uScroll.value =
        scroll.offset * 0.75;
    }
  });

  const handleAppear = () => {
    const interval = setInterval(() => {
      triangleRef.current.scale = 1;
      setTimeout(() => {
        triangleRef.current.scale = 0;
      }, Math.random() * 20);
      if (Math.random() <= 0.1) {
        clearInterval(interval);
      }
    }, Math.random() * 500);
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        scale={props.triangleScale}
        ref={triangleRef}
        position={[0, 0, 0]}
        rotation={[degToRad(90), 0, 0]}
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        depthWrite={true}
      >
        <shaderMaterial
          fragmentShader={contentTriangleFragment}
          vertexShader={contentTriangleVertex}
          transparent
          opacity={0.2}
          uniforms={{
            uTime: { value: 0 },
            image: { value: image },
            uScroll: { value: 0 },
            uTimePattern: { value: 0 },
            trianglePattern: { value: triangle_pattern_texture },
            uOpacity: { value: 1.0 },
          }}
        />
      </mesh>
    </group>
  );
});

useGLTF.preload("/models/Triangle2.glb");

export default Triangle2;
