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
import PostProcessingEffects from "./components/PostProcessingEffects/PostProcessingEffects";
import * as THREE from "three";
import EyeModel from "./components/EyeModel/EyeModel";
import Section1 from "./components/Section1/Section1";
import Section2 from "./components/Section2/Section2";
import Section3 from "./components/Section3/Section3";
import Section4 from "./components/Section4/Section4";

import DavidSmallNav from "./components/SmallNav/DavidSmallNav";
import CameraRig from "./components/CameraRig/CameraRig";

//? THEATRE IMPORTS

// import { getProject, val } from "@theatre/core";
// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";
// import { SheetProvider, useCurrentSheet, editable as e } from "@theatre/r3f";
// studio.extend(extension);
// studio.initialize();

const SectionDavid = ({ isPhone }) => {
  console.log(isPhone);
  // const sheet = getProject("Davido").sheet("Scene");
  const camRef = useRef();

  const section1Ref = useRef();
  const section2Ref = useRef();
  const section3Ref = useRef();
  const section4Ref = useRef();
  const smallNavRef = useRef();

  //   useEffect(() => {
  //     console.log("DAVIDO");
  //   });
  const mobilePosData = [
    [
      [3.2, 5.704, -3.481],
      [0, -3.95, 0],
    ],
    [
      [0.2, 5.54, 2.11],
      [0.1, -6.37, 0],
    ],
    [
      [1.6, 3.08, -0.83],
      [-0.1, -3.72, 0],
    ],
    [
      [1.4, -1.65, 0.712],
      [-0.2, -3.65, 0],
    ],
  ];

  const PcPosData = [
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

  const sections = [section1Ref, section2Ref, section3Ref, section4Ref];

  const changeLocation = (location) => {
    let posData = [];

    if (isPhone) {
      posData = mobilePosData;
    } else {
      posData = PcPosData;
    }

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
          <group
            ref={camRef}
            position={isPhone ? mobilePosData[0][0] : PcPosData[0][0]}
            rotation={isPhone ? mobilePosData[0][1] : PcPosData[0][1]}
          >
            <CameraRig isPhone={isPhone} />
          </group>
          <DavidHuman />
          <EyeModel />

          <EnviromentLights />
          {/* <ambientLight /> */}
          {/* </SheetProvider> */}
          {/* <OrbitControls /> */}

          {/* <Stats /> */}
        </Suspense>
        <PostProcessingEffects />
      </Canvas>

      <div
        className="html-david-container"
        style={{
          // backgroundColor: "wheat",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
      >
        <Section1 callBackProp={() => changeLocation(1)} ref={section1Ref} />
        <Section2 ref={section2Ref} />
        <Section3 ref={section3Ref} />
        <Section4 ref={section4Ref} />

        <DavidSmallNav
          ref={smallNavRef}
          navCallback={(loc) => changeLocation(loc)}
        />
      </div>
      <Loading />
    </>
  );
};

export default SectionDavid;
