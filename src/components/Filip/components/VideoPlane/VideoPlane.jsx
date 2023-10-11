import React, { useRef } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import vid1_hevc from "/imgs/filip/videocontent/collection.mp4";
import * as THREE from "three";
import { DoubleSide, BackSide } from "three";
import { useFrame } from "@react-three/fiber";
import dissolveFragment from "../shaders/dissolveFragmentShader.glsl";
import dissolveVertex from "../shaders/dissolveVertexShader.glsl";
import gsap from "gsap";
import { useEffect } from "react";
import { useImperativeHandle, forwardRef } from "react";

export function VideoPlane(props, ref) {
  useImperativeHandle(ref, () => ({
    appear,
    disappear,
  }));
  const materialRef = useRef();
  const { nodes, materials } = useGLTF("/models/VideoPlane.glb");
  const texture = useVideoTexture(vid1_hevc);

  useEffect(() => {
    console.log(materialRef.current);
  }, []);
  const appear = () => {
    gsap.to(materialRef.current, {
      opacity: 1,
      duration: 5,
      ease: "power3.inOut",
    });
  };
  const disappear = () => {
    gsap.to(materialRef.current, {
      opacity: 0,
      duration: 5,
      ease: "power3.inOut",
    });
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.VideoPlane.geometry}
        scale={[1.77 * 2, 1, 1 * 2]}
      >
        <meshBasicMaterial
          side={BackSide}
          map={texture}
          depthWrite={true}
          transparent
          opacity={0}
          ref={materialRef}
        />
        {/* <shaderMaterial
          fragmentShader={dissolveFragment}
          vertexShader={dissolveVertex}
          uniforms={{
            uTexture: { value: texture },
          }}
          side={BackSide}
        /> */}
      </mesh>
    </group>
  );
}

export default forwardRef(VideoPlane);
useGLTF.preload("/models/VideoPlane.glb");
