import { useEffect, useRef, useState } from "react";
import {
  Environment,
  Float,
  Sparkles,
  useVideoTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Lightformer } from "@react-three/drei";
import vid1_hevc from "/imgs/filip/videocontent/collection.mp4";
import { degToRad } from "three/src/math/MathUtils";

const EnvironmentLandingLights = () => {
  const lightRef = useRef();

  useFrame((state, delta) => {
    lightRef.current.rotation.y += 0.3 * delta;
  });

  const texture = useVideoTexture(vid1_hevc);

  return (
    <>
      <Environment frames={Infinity} resolution={512} background blur={0.9}>
        <group ref={lightRef}>
          <Lightformer
            // form="ring" // circle | ring | rect (optional, default = rect)

            form="rect"
            intensity={2} // power level (optional = 1)
            // color="#61f1ff" // (optional = white)
            color="#00989d"
            position={[0, 1, -15]}
            scale={[30, 1]} // Scale it any way you prefer (optional = [1, 1])
            // scale={[10, 1]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />

          <Lightformer
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={0.5} // power level (optional = 1)
            // color="#00efff" // (optional = white)
            // color="#dabcff"
            position={[0, 1, 10]}
            scale={[30, 1]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />
          {/* <mesh
          //  rotation={[degToRad(180), 0, 0]}
          position={[0, 1, -5]}
          scale={7}
        >
          <planeGeometry args={[1.77, 1]} />
          <meshBasicMaterial map={texture} />
        </mesh> */}
        </group>
      </Environment>
    </>
  );
};

export default EnvironmentLandingLights;
