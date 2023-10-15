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
import { useImperativeHandle, forwardRef, useState } from "react";

export function VideoPlane(props, ref) {
  useImperativeHandle(ref, () => ({
    appear,
    disappear,
  }));
  const materialRef = useRef();
  const { nodes, materials } = useGLTF("/models/VideoPlane.glb");
  const videoPlayerProps = {
    start: false,
  };
  const texture = useVideoTexture(vid1_hevc, videoPlayerProps);

  const videoRef = useRef();
  const bgBlur = document.querySelector(".html_container");
  const isPlaying = useRef(false);
  const scale = props.isPhone ? 0.75 : 2;

  useEffect(() => {
    console.log(materialRef.current);
    stopVideo();
  }, []);
  const appear = () => {
    playVideo();
    bgBlur.style.backdropFilter = "blur(0.5px)";
    bgBlur.style.webkitBackdropFilter = "blur(0.5px)";

    setTimeout(() => {
      gsap.to(materialRef.current, {
        opacity: 1,
        duration: 3,
        ease: "power3.inOut",
      });
    }, 1500);
  };
  const disappear = () => {
    gsap.to(materialRef.current, {
      opacity: 0,
      duration: 2,
      ease: "power3.inOut",
      onComplete: () => {
        stopVideo();
      },
    });
  };
  const playVideo = () => {
    texture.image.play();
  };
  const stopVideo = () => {
    texture.image.pause();
    texture.image.currentTime = 0;
    console.log(texture.image);
    bgBlur.style.backdropFilter = "blur(1.5px)";
    bgBlur.style.webkitBackdropFilter = "blur(1.5px)";
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.VideoPlane.geometry}
        scale={[1.77 * scale, 1, 1 * scale]}
      >
        <meshBasicMaterial
          side={BackSide}
          map={texture}
          depthWrite={false}
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
