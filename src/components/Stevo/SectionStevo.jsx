import {
  AsciiRenderer,
  Environment,
  Html,
  MeshTransmissionMaterial,
  OrbitControls,
  PerspectiveCamera,
  Stats,
  Text,
} from "@react-three/drei";
import Human from "./components/Human";
import { useRef } from "react";
import { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import {
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { Vector2 } from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";
import Loading from "../Loading/Loading";
import "./SectionStevo.css";
import { gsap } from "gsap";
import { BlurPass } from "postprocessing";

import ScreenColorFragment from "./components/shaders/ScreenColorFragment.glsl";
import ScreenColorVertex from "./components/shaders/ScreenColorVertex.glsl";
import EnviromentLightsStevo from "./components/EnviromentLightsStevo/EnviromentLightsStevo";
import PostProcessingEffectsStevo from "./components/PostProcessingEffectsStevo/PostProcessingEffectsStevo";

const Scene = () => {
  const camRef = useRef();
  const camPivotRef = useRef();
  const { viewport } = useThree();
  const textRef = useRef();
  const planeRef = useRef();

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

      {/* <Text
        strokeWidth={0.01}
        strokeColor={"white"}
        ref={textRef}
        font={"/LEMONMILK.otf"}
        scale={0.1}
        color={"cyan"}
        fillOpacity={1}
        letterSpacing={0.2}
        position={[0, 1.55, 0]}
      >
        steev
      </Text> */}
      <Html transform>
        <div className="stevo-cont">
          <h1
            style={{
              color: "white",
            }}
          >
            Stevo
          </h1>
        </div>
      </Html>
    </>
  );
};
const SectionStevo = () => {
  return (
    <>
      <Canvas>
        <Scene />

        <EnviromentLightsStevo />
        <PostProcessingEffectsStevo />
        {/* <OrbitControls /> */}
      </Canvas>

      {/* <div className="html-stevo-container"></div> */}
      <Loading />
    </>
  );
};

export default SectionStevo;
