import { useEffect, useRef, useState } from "react";
import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Lightformer } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";

const EnvMap = () => {
  const lightRef = useRef();

  useFrame((state, delta) => {
    lightRef.current.rotation.y += 0.6 * delta;
  });

  return (
    <>
      <Environment frames={Infinity} resolution={512} blur={0.9}>
        <group ref={lightRef}>
          <Lightformer
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={3} // power level (optional = 1)
            color="orange" // (optional = white)
            position={[0, 1, -5]}
            scale={[10, 20]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />

          <Lightformer
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={0.7} // power level (optional = 1)
            color="#00efff" // (optional = white)
            position={[0, 1, 5]}
            scale={[15, 15]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />
        </group>
      </Environment>
    </>
  );
};

export default EnvMap;
