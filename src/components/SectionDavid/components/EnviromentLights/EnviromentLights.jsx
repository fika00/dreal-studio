import { useEffect, useRef, useState } from "react";
import { Environment, Float, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Lightformer } from "@react-three/drei";
import Effects from "../PostProcessingEffects/PostProcessingEffects";
import vid1_hevc from "/imgs/filip/videocontent/collection.mp4";
import { degToRad } from "three/src/math/MathUtils";

const EnviromentLights = () => {
  const lightRef = useRef();

  useFrame((state, delta) => {
    lightRef.current.rotation.x += 0.5 * delta;
  });

  const texture = useVideoTexture(vid1_hevc);

  return (
    <>
      <Environment frames={Infinity} resolution={256} background blur={0.9}>
        <group ref={lightRef}>
          <Lightformer
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={1 / 8} // power level (optional = 1)
            color="#61f1ff" // (optional = white)
            position={[0, 1, -5]}
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />

          <Lightformer
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={0.7 / 8} // power level (optional = 1)
            color="#00efff" // (optional = white)
            position={[0, 1, 5]}
            scale={[5, 5]} // Scale it any way you prefer (optional = [1, 1])
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

export default EnviromentLights;
