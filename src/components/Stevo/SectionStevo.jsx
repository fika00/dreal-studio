import {
  AsciiRenderer,
  Environment,
  Html,
  MeshTransmissionMaterial,
  OrbitControls,
  PerspectiveCamera,
  Stats,
} from "@react-three/drei";
import Human from "./components/Human";
import { useRef } from "react";
import { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";
import Loading from "../Loading/Loading";

const Scene = () => {
  const camRef = useRef();
  const camPivotRef = useRef();
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    // Define the rotation speed (adjust this value as needed)
    const rotationSpeed = 0.4;

    // Calculate the target rotation based on the mouse input
    const targetRotationY = (mouse.x / 3) * rotationSpeed;
    const targetRotationX = (mouse.y / 3) * rotationSpeed * -1;

    // Smoothly interpolate the current rotation towards the target rotation
    camPivotRef.current.rotation.y +=
      (targetRotationY - camPivotRef.current.rotation.y) * 0.01;
    camPivotRef.current.rotation.x +=
      (targetRotationX - camPivotRef.current.rotation.x) * 0.01;
  });

  return (
    <>
      <Human />
      <group ref={camPivotRef} position={[0, 1.73, 0]}>
        <PerspectiveCamera
          position={[-0.14, 0, 0.88]}
          rotation={[-0.07, -0.204, -0.014]}
          fov={50}
          makeDefault
          ref={camRef}
        />
      </group>
    </>
  );
};
const SectionStevo = () => {
  return (
    <>
      <Canvas>
        <Scene />
        <EffectComposer>
          <ToneMapping middleGrey={0.8} />

          <ChromaticAberration offset={[0.001, 0]} />
          <Bloom mipmapBlur luminanceThreshold={0.2} />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default SectionStevo;
