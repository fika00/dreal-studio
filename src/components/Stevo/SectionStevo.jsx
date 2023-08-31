import {
  AsciiRenderer,
  Environment,
  Html,
  MeshTransmissionMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Human from "./components/Human";
import { useRef } from "react";
import { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";

const SectionStevo = () => {
  const camRef = useRef();

  // Pos [-0.1392253293947678, 1.7273744574056682, 0.8768709132966818]
  // Rot [-0.06951343677661365, -0.20374088233570883, -0.014086715337174295]

  return (
    <>
      <Human />
      <PerspectiveCamera
        position={[-0.14, 1.73, 0.88]}
        rotation={[-0.07, -0.204, -0.014]}
        fov={50}
        makeDefault
        ref={camRef}
      />
      {/* <Environment preset="forest" background={true} /> */}
      <ambientLight intensity={0.2} />
      {/* <OrbitControls ref={camRef} /> */}
      {/* <mesh position={[0, 1.75]}>
        <planeGeometry />
        <MeshTransmissionMaterial transmission={1} />
      </mesh> */}
      <EffectComposer>
        <ChromaticAberration />
        <Bloom mipmapBlur luminanceThreshold={0.2} />
      </EffectComposer>
    </>
  );
};

export default SectionStevo;
