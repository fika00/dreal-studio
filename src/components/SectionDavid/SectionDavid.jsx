import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Loading from "../Loading/Loading";
import { DavidHuman } from "./components/Human/DavidHuman";
import {
  Environment,
  Lightformer,
  OrbitControls,
  Stats,
  PerspectiveCamera,
} from "@react-three/drei";
import { useEffect } from "react";
// import SpotLightWithHelper from "./components/SpotLightWithHelper/SpotLightWithHelper";
import { RectAreaLight } from "three";

import EnviromentLights from "./components/EnviromentLights/EnviromentLights";
import gsap from "gsap";
import "./SectionDavid.scss";
import Effects from "./components/Effects/Effects";
import * as THREE from "three";
import EyeModel from "./components/EyeModel/EyeModel";
import Section1 from "./components/Section1/Section1";
import Section2 from "./components/Section2/Section2";
import Section3 from "./components/Section3/Section3";
import DavidSmallNav from "./components/SmallNav/DavidSmallNav";
import CameraRig from "./components/CameraRig/CameraRig";

//? THEATRE IMPORTS

// import { getProject, val } from "@theatre/core";
// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";
// import { SheetProvider, useCurrentSheet, editable as e } from "@theatre/r3f";
// studio.extend(extension);
// studio.initialize();

const SectionDavid = () => {
  // const sheet = getProject("Davido").sheet("Scene");
  const camRef = useRef();

  const section1Ref = useRef();
  const section2Ref = useRef();
  const section3Ref = useRef();
  const smallNavRef = useRef();

  //   useEffect(() => {
  //     console.log("DAVIDO");
  //   });
  const posData = [
    [
      [1.266, 5.504, -2.281],
      [0, -3.95, 0],
    ],
    [
      [0.467, 5.894, 1.51],
      [0, -6.37, 0],
    ],
    [
      [1.5, 3.08, -0.53],
      [0, -3.72, 0],
    ],
    [
      [0.537, -0.705, 1.312],
      [0.49, -3.19, 0],
    ],
  ];

  const sections = [section1Ref, section2Ref, section3Ref, null];

  const changeLocation = (location) => {
    const loc = posData[location];

    smallNavRef.current.setCurrentPos(location);

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

    sections.forEach((section, index) => {
      if (index == location) {
        if (section != null) {
          section.current.enter();
        }
      } else {
        if (section != null) {
          section.current.exit();
        }
      }
    });
  };
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          {/* <SheetProvider sheet={sheet}> */}
          <group ref={camRef} position={posData[0][0]} rotation={posData[0][1]}>
            <CameraRig />
          </group>
          <DavidHuman />
          <EyeModel />

          <Environment frames={Infinity} resolution={256} background blur={0.9}>
            <EnviromentLights />
          </Environment>
          {/* <ambientLight /> */}
          <Effects />
          {/* </SheetProvider> */}
          {/* <OrbitControls /> */}

          {/* <Stats /> */}
        </Suspense>
      </Canvas>
      {/* 
      <div className="button-testing">
        <button
          className="buttonitself"
          onClick={() => {
            changeLocation(0);
          }}
        >
          Section1
        </button>
        <button
          className="buttonitself"
          onClick={() => {
            changeLocation(1);
          }}
        >
          Section2
        </button>
        <button
          className="buttonitself"
          onClick={() => {
            changeLocation(2);
          }}
        >
          Section3
        </button>
        <button
          className="buttonitself"
          onClick={() => {
            changeLocation(3);
          }}
        >
          Section4
        </button>
      </div> */}

      <Section1 callBackProp={() => changeLocation(1)} ref={section1Ref} />
      <Section2 ref={section2Ref} />
      <Section3 ref={section3Ref} />

      <DavidSmallNav
        ref={smallNavRef}
        navCallback={(loc) => changeLocation(loc)}
      />
      <Loading />
    </>
  );
};

export default SectionDavid;
