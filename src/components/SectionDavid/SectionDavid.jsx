import { Canvas } from "@react-three/fiber";
// import { getProject, val } from "@theatre/core";
// import {
//   SheetProvider,
//   PerspectiveCamera,
//   useCurrentSheet,
// } from "@theatre/r3f";
// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";
import { Suspense } from "react";
import Loading from "../Loading/Loading";
import { DavidHuman } from "./components/Human/DavidHuman";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

// studio.extend(extension);
// studio.initialize();

const SectionDavid = () => {
  //   const sheet = getProject("Davido").sheet("Scene");
  //   useEffect(() => {
  //     console.log("DAVIDO");
  //   });
  return (
    <>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <DavidHuman />
        <OrbitControls />
        {/* <ambientLight /> */}
        <pointLight
          position={[-0.58, 0.91, 6.8]}
          intensity={50}
          color={"#FFD27A"}
        />
        <pointLight
          position={[0.07, 6.62, -5.52]}
          intensity={30}
          color={"#92E5FF"}
        />
      </Canvas>

      <Loading />
    </>
  );
};

export default SectionDavid;
