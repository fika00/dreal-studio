import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Loading from "../Loading/Loading";
import { DavidHuman } from "./components/Human/DavidHuman";
import {
  Environment,
  Lightformer,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import { useEffect } from "react";
import SpotLightWithHelper from "./components/SpotLightWithHelper/SpotLightWithHelper";
import { RectAreaLight } from "three";

import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  useCurrentSheet,
  PerspectiveCamera,
  editable as e,
} from "@theatre/r3f";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import EnviromentLights from "./components/EnviromentLights/EnviromentLights";
import gsap from "gsap";
import "./SectionDavid.scss";
import Effects from "./components/Effects/Effects";
import * as THREE from "three";
import EyeModel from "./components/EyeModel/EyeModel";

studio.extend(extension);
studio.initialize();

const SectionDavid = () => {
  const sheet = getProject("Davido").sheet("Scene");
  const camRef = useRef();
  //   useEffect(() => {
  //     console.log("DAVIDO");
  //   });
  const posData = [
    [
      [2.243, 5.343, -3.813],
      [0, -3.95, 0],
      //
      // [1.236, 5.013, -2.584],
      // [2.981, 0.766, -3.034],
    ],
    [
      [0.473, 5.757, 1.97],
      [0, -6.23, 0],
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
      <Canvas>
        <Suspense fallback={null}>
          <SheetProvider sheet={sheet}>
            <PerspectiveCamera
              ref={camRef}
              makeDefault
              theatreKey="MainCamera"
            />
            <DavidHuman />
            <EyeModel />
            {/* <SpotLightWithHelper
          theatreKey="SpotLight 1"
          position={[0, 0, 0]}
          intensity={1}
          showHelper={true}
        /> */}
            {/* <SpotLightWithHelper
            theatreKey="SpotLight 2"
            position={[0, 0, 0]}
            intensity={1}
            showHelper={true}
          /> */}

            <Environment
              frames={Infinity}
              resolution={256}
              // background
              // blur={0.4}
            >
              <EnviromentLights />
            </Environment>
            {/* <ambientLight /> */}
            <Effects />
          </SheetProvider>
          {/* <OrbitControls /> */}

          <Stats />
        </Suspense>
      </Canvas>

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
      </div>

      <Loading />
    </>
  );
};

export default SectionDavid;
