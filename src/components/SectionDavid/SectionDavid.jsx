import { Canvas } from "@react-three/fiber";
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
  editable as e,
} from "@theatre/r3f";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { Suspense } from "react";
import Loading from "../Loading/Loading";
import { DavidHuman } from "./components/Human/DavidHuman";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import SpotLightWithHelper from "./components/SpotLightWithHelper/SpotLightWithHelper";
import { RectAreaLight } from "three";

studio.extend(extension);
studio.initialize();

const SectionDavid = () => {
  const sheet = getProject("Davido").sheet("Scene");
  //   useEffect(() => {
  //     console.log("DAVIDO");
  //   });
  return (
    <>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <SheetProvider sheet={sheet}>
          <PerspectiveCamera makeDefault theatreKey="MainCamera" />
          <DavidHuman />

          <SpotLightWithHelper
            theatreKey="SpotLight 1"
            position={[0, 0, 0]}
            intensity={1}
            showHelper={true}
          />
          <SpotLightWithHelper
            theatreKey="SpotLight 2"
            position={[0, 0, 0]}
            intensity={1}
            showHelper={true}
          />
          <Environment background={false}>
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
          </Environment>
          <OrbitControls />
        </SheetProvider>
      </Canvas>

      <Loading />
    </>
  );
};

export default SectionDavid;
