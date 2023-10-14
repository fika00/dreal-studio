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
import { Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import SpotLightWithHelper from "./components/SpotLightWithHelper/SpotLightWithHelper";
import { RectAreaLight } from "three";

// studio.extend(extension);
// studio.initialize();

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
        </SheetProvider>
      </Canvas>

      <Loading />
    </>
  );
};

export default SectionDavid;
