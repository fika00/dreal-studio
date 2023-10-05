import React, { useRef } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import vid1 from "/imgs/filip/videocontent/vid1.webm";
import vid1_hevc from "/imgs/filip/videocontent/vid1.mp4";

import { DoubleSide } from "three";
import { useFrame } from "@react-three/fiber";

export function VideoPlane(props) {
  const meshRef = useRef();
  const { nodes, materials } = useGLTF("/models/VideoPlane.glb");
  const texture = useVideoTexture(vid1_hevc);
  useFrame((state, delta) => {
    meshRef.current.rotation.z += 0.004;
  });
  return (
    <group {...props} dispose={null} rotation={[0, 0.3, 0]} ref={meshRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.VideoPlane.geometry}
        scale={[1.77, 1, 1]}
      >
        <meshBasicMaterial map={texture} depthWrite={true} opacity={1} />
      </mesh>
    </group>
  );
}

export default VideoPlane;
useGLTF.preload("/models/VideoPlane.glb");
