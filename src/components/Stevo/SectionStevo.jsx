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

    planeRef.current.material.uniforms.time.value += 0.01;
  });
  // useEffect(() => {
  //   console.log(textRef.current);
  //   const blinking = () => {
  //     const dur = Math.random() / 2;
  //     console.log(dur);
  //     gsap.to(textRef.current, {
  //       fillOpacity: 0,
  //       duration: dur,
  //       // ease: "power3.inOut",
  //       onComplete: () =>
  //         gsap.to(textRef.current, {
  //           fillOpacity: 1,
  //           duration: dur,
  //           // ease: "power3.inOut",
  //           onComplete: () => blinking(),
  //         }),
  //     });
  //   };
  //   blinking();
  // }, []);

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
      <mesh position={[0, 1.7, -1]} ref={planeRef}>
        <planeGeometry />
        <shaderMaterial
          vertexShader={ScreenColorVertex}
          fragmentShader={ScreenColorFragment}
          uniforms={{
            tDiffuse: { value: null },
            time: { value: 0 },
          }}
        />
      </mesh>
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
    </>
  );
};
const SectionStevo = () => {
  return (
    <>
      <Canvas>
        <Scene />

        <EffectComposer>
          <ToneMapping middleGrey={0.5} />
          <Bloom mipmapBlur luminanceThreshold={0.3} intensity={3} />
          {/* <ChromaticAberration offset={[0.001, 0]} /> */}
          {/* <HueSaturation saturation={-1} /> */}
        </EffectComposer>
      </Canvas>

      <div className="html-stevo-container"></div>
      <Loading />
    </>
  );
};

export default SectionStevo;
