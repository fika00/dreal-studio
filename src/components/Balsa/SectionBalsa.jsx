import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  Trail,
  Cloud,
  OrbitControls,
  Sparkles,
  Stats,
  PerspectiveCamera,
  MeshReflectorMaterial,
  Environment,
  Html,
  Image,
  Reflector,
} from "@react-three/drei";
import { Color, DoubleSide } from "three";
import { gsap } from "gsap";
import "./SectionBalsa.css";
import {
  Bloom,
  ChromaticAberration,
  Depth,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import { Outline } from "@react-three/postprocessing";

//! COMPONENTS

import Loading from "../Loading/Loading";

//? CONTENT

import balsa from "/imgs/balsa/balsa.png";

import img0 from "/imgs/balsa/content/image0.jpg";
import img1 from "/imgs/balsa/content/image1.jpg";
import img2 from "/imgs/balsa/content/image2.jpg";
import img3 from "/imgs/balsa/content/image3.jpg";
import img4 from "/imgs/balsa/content/image4.jpg";
import img5 from "/imgs/balsa/content/image5.jpg";
import img6 from "/imgs/balsa/content/image6.jpg";
import { degToRad } from "three/src/math/MathUtils";
import ReflectiveFloor from "./components/ReflectiveFloor";

const SectionBalsa = ({ isPhone }) => {
  return (
    <>
      <Canvas>
        <Scene isPhone={isPhone} />
      </Canvas>
      <Loading />
    </>
  );
};

const Screen = () => {
  return (
    <>
      <mesh position={[0, 0, -0.75]} scale={1.3}>
        <planeGeometry args={[1.77, 1]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
};

const Screens = ({ isPhone }) => {
  return (
    <>
      <mesh position={[0, 0, -0.75]} scale={1.3}>
        <planeGeometry args={[1.77, 1]} />
        <meshBasicMaterial />
      </mesh>

      {!isPhone && (
        <group>
          <mesh rotation={[0, 0.35, 0]} position={[-2.5, 0, -0.3]} scale={1.3}>
            <planeGeometry args={[1.77, 1]} />
            <meshBasicMaterial />
          </mesh>
          <mesh rotation={[0, -0.35, 0]} position={[2.5, 0, -0.3]} scale={1.3}>
            <planeGeometry args={[1.77, 1]} />
            <meshBasicMaterial />
          </mesh>
        </group>
      )}
    </>
  );
};

const Scene = ({ isPhone }) => {
  // DA DA

  return (
    <>
      <PerspectiveCamera
        rotation={[-0.1, 0, 0]}
        makeDefault
        position={[0, 0.4, 4]}
      />
      <Screens />
      <Image url={balsa} transparent scale={1.15} position={[0, -0.15, 0]} />

      <ReflectiveFloor />

      <ambientLight intensity={0.5} />

      <EffectComposer>
        <Bloom intensity={1} radius={0.5} mipmapBlur />
      </EffectComposer>
      {/* <OrbitControls /> */}
      {/* <Stats /> */}
    </>
  );
};

export default SectionBalsa;
