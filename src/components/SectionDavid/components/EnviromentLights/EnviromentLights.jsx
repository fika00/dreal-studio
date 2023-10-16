import { useRef } from "react";
import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Lightformer } from "@react-three/drei";

const EnviromentLights = () => {
  const lightRef = useRef();

  return (
    <>
      <Environment>
        <group ref={lightRef}>
          <Lightformer
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="#61f1ff" // (optional = white)
            position={[0, 1, -5]}
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />
          <Lightformer
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={0.7} // power level (optional = 1)
            color="#00efff" // (optional = white)
            position={[0, 1, 5]}
            scale={[5, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 1, 0]} // Target position (optional = undefined)
          />
        </group>
      </Environment>
    </>
  );
};

export default EnviromentLights;
