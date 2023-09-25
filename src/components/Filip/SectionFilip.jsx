import { Canvas, extend, useFrame } from "@react-three/fiber";
import { data } from "./components/data";
import { dataHeart } from "./components/dataHeart";
import { dataHead } from "./components/dataHead";
import { getProject, val } from "@theatre/core";
import * as THREE from "three";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
// declaratively
import { useEffect, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Loading from "../Loading/Loading";
import CurveToMesh from "./components/CurveToMesh";
import gsap from "gsap";

import "./SectionFilip.scss";

import HeroTextAnim from "./components/HeroTextAnim";
import ButtonDreal from "./components/ButtonDreal/ButtonDreal";

import outlineFragmentShader from "./components/shaders/outlineFragmentShader.glsl";
import outlineVertexShader from "./components/shaders/outlineVertexShader.glsl";

import heartFragmentShader from "./components/shaders/heartFragmentShader.glsl";
import heartVertexShader from "./components/shaders/heartVertexShader.glsl";
import Icon from "./components/Icon/Icon";
import HeroContainer from "./components/HeroContainer/HeroContainer";

// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";
// import {
//   PerspectiveCamera,
//   SheetProvider,
//   useCurrentSheet,
// } from "@theatre/r3f";

// studio.extend(extension);
// studio.initialize();

const SectionFilip = () => {
  const camRef = useRef();
  const nameRef = useRef();

  const posData = [
    [
      [0.5, -1.51, 3.579],
      [0.48, 0.47, 0],
    ],
    [
      [-1.56, -1.51, 5.69],
      [0, -0.59, 0],
    ],
    [
      [-0.039, -8.79, 5.01],
      [-0.009, -0.065, 0.0],
    ],
    [
      [0, -14.764, 7.552],
      [-0.16, 0, 0],
    ],
  ];

  const changeLocation = (location) => {
    const loc = posData[location];

    gsap.to(camRef.current.position, {
      x: loc[0][0],
      y: loc[0][1],
      z: loc[0][2],
      duration: 4,
      ease: "power3.inOut",
    });
    gsap.to(camRef.current.rotation, {
      x: loc[1][0],
      y: loc[1][1],
      z: loc[1][2],
      duration: 4,
      ease: "power3.inOut",
    });
  };
  return (
    <>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <PerspectiveCamera
          ref={camRef}
          position={posData[2][0]}
          rotation={posData[2][1]}
          fov={45}
          makeDefault
        />
        {/* <SheetProvider sheet={sheet}> */}
        {/* <CamMovement /> */}
        <group rotation={[0, 0, 0]} position={[0, -1, 2.5]}>
          <CurveToMesh
            data={dataHead}
            materialColor={"cyan"}
            materialColor2={"black"}
            thick={0.002}
            fragment={outlineFragmentShader}
            vertex={outlineVertexShader}
          />
        </group>
        <group
          rotation={[degToRad(-90), 0, 0]}
          scale={0.1}
          position={[0, -10, 1.5]}
        >
          <CurveToMesh
            data={dataHeart}
            materialColor={"red"}
            materialColor2={"black"}
            thick={0.02}
            fragment={heartFragmentShader}
            vertex={heartVertexShader}
          />
        </group>
        <group
          rotation={[degToRad(-30), 0, degToRad(180)]}
          position={[0, -15, 2.5]}
        >
          <CurveToMesh
            data={data}
            materialColor={"cyan"}
            materialColor2={"blue"}
            thick={0.0025}
            fragment={outlineFragmentShader}
            vertex={outlineVertexShader}
          />
        </group>
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} intensity={1} mipmapBlur />
        </EffectComposer>
        {/* <OrbitControls /> */}
        {/* </SheetProvider> */}
      </Canvas>

      <div className="html_container">
        <HeroContainer />
      </div>

      <Loading />
    </>
  );
};

export default SectionFilip;
