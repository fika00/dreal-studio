import { useEffect, useRef, useState } from "react";
import { Environment, Float, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Lightformer } from "@react-three/drei";
import vid1_hevc from "/imgs/filip/videocontent/collection.mp4";
import { degToRad } from "three/src/math/MathUtils";

const EnviromentLightsStevo = () => {
  const lightRef = useRef();

  useFrame((state, delta) => {
    lightRef.current.rotation.x += 0.6 * delta;
  });

  const texture = useVideoTexture(vid1_hevc);

  return (
    <>
      <Environment frames={Infinity} resolution={1024} background blur={1}>
        <group ref={lightRef} rotation={[3.2, 0, 0]}>
          <Lightformer
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={1 / 5} // power level (optional = 1)
            color="#00dbda" // (optional = white)
            position={[0, 1, -5]}
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />

          <Lightformer
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1 / 5} // power level (optional = 1)
            color="#ff5d1b" // (optional = white)
            position={[0, 1, 5]}
            scale={[5, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />
        </group>
      </Environment>
    </>
  );
};

export default EnviromentLightsStevo;
