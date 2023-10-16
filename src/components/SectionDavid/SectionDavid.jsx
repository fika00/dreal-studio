import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
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
import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";

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

studio.extend(extension);
studio.initialize();

const SectionDavid = () => {
  const sheet = getProject("Davido").sheet("Scene");
  //   useEffect(() => {
  //     console.log("DAVIDO");
  //   });
  const posData = [
    [
      [1.236, 5.013, -2.584],
      [2.981, 0.766, -3.034],
    ],
    [
      [0.44, 5.86, 1.97],
      [0, -0.09, 0],
    ],
    [
      [1.5, 3.08, -0.53],
      [0, 2.54, 0],
    ],
  ];
  return (
    <>
      <Canvas>
        <SheetProvider sheet={sheet}>
          <PerspectiveCamera makeDefault theatreKey="MainCamera" />
          <DavidHuman />

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

          <EnviromentLights />

          {/* <ambientLight /> */}
        </SheetProvider>
        {/* <OrbitControls /> */}
        <EffectComposer>
          <ToneMapping middleGrey={0.3} />
          <Bloom intensity={1} luminanceThreshold={0.45} mipmapBlur />
        </EffectComposer>
        <Stats />
      </Canvas>

      <Loading />
    </>
  );
};

export default SectionDavid;
