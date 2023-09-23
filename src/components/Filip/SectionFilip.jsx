import { Canvas, extend, useFrame } from "@react-three/fiber";
import { data } from "./components/data";
import { dataHeart } from "./components/dataHeart";
import { dataHead } from "./components/dataHead";

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

const CamMovement = () => {
  const groupRef = useRef();
  const scroll = useScroll();
  const camRef = useRef();
  const isAnimating = useRef(false);
  const currentSection = useRef(0);
  console.log(scroll);
  const posData = [
    [
      [0.713, -3.671, 2.488],
      [0.771, 0.216, -0.205],
    ],
    [
      [-2.322, -5.59, 7.726],
      [0.507, -0.279, 0.152],
    ],
    [
      [-1.215, -10.081, 9.831],
      [0.125, -0.095, 0.012],
    ],
    [
      [-0.341, -10.614, 12.032],
      [-0.413, -0.016, -0.007],
    ],
  ];

  const changeLocation = (location) => {
    const loc = posData[location];
    isAnimating.current = true;
    currentSection.current = location;

    gsap.to(camRef.current.position, {
      x: loc[0][0],
      y: loc[0][1],
      z: loc[0][2],
      duration: 4,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimating.current = false;
      },
    });
    gsap.to(camRef.current.rotation, {
      x: loc[1][0],
      y: loc[1][1],
      z: loc[1][2],
      duration: 4,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };
  function mapRange(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }
  useFrame(() => {
    const page = Math.floor(scroll.offset * 4);
    console.log(page, isAnimating.current);
    if (!isAnimating.current && currentSection.current != page) {
      changeLocation(page);
    }
  });

  // useFrame((state, delta) => {
  //   console.log(
  //     "POSITION: ",
  //     camRef.current.position,
  //     "ROTATION: ",
  //     camRef.current.rotation
  //   );
  // });

  return (
    <>
      <group ref={groupRef} position={[0, 0, 2]}>
        <PerspectiveCamera
          ref={camRef}
          // position={[0, -1.5, 20]}
          position={posData[0][0]}
          rotation={posData[0][1]}
          fov={20}
          makeDefault
        />
      </group>
      {/* <OrbitControls /> */}
    </>
  );
};

const SectionFilip = () => {
  return (
    <>
      <Canvas>
        <ScrollControls pages={4}>
          <CamMovement />
        </ScrollControls>
        <group rotation={[0, 0, 0]} position={[0, -1, 2.5]}>
          <CurveToMesh
            data={dataHead}
            materialColor={"cyan"}
            materialColor2={"black"}
            thick={0.002}
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
          />
        </group>

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={2} mipmapBlur />
        </EffectComposer>
        {/* <OrbitControls /> */}
      </Canvas>
      <Loading />
    </>
  );
};

export default SectionFilip;
