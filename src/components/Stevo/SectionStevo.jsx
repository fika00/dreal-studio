import {
  AsciiRenderer,
  Environment,
  Html,
  MeshTransmissionMaterial,
  OrbitControls,
  PerspectiveCamera,
  Stats,
} from "@react-three/drei";
import Human from "./components/Human";
import { useRef } from "react";
import { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  ToneMapping,
  HueSaturation,
} from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";
import Loading from "../Loading/Loading";

const SectionStevo = () => {
  const camRef = useRef();

  // Pos [-0.1392253293947678, 1.7273744574056682, 0.8768709132966818]
  // Rot [-0.06951343677661365, -0.20374088233570883, -0.014086715337174295]

  return (
    <>
      <Canvas>
        <Human />
        <PerspectiveCamera
          position={[-0.14, 1.73, 0.88]}
          rotation={[-0.07, -0.204, -0.014]}
          fov={50}
          makeDefault
          ref={camRef}
        />

        <EffectComposer>
          <ToneMapping middleGrey={0.8} />
          <ChromaticAberration offset={[0.001, 0]} />
          <Bloom mipmapBlur intensity={3.5} luminanceThreshold={0.5} />
        </EffectComposer>
        <Stats />
      </Canvas>
      <Loading name={"Balsa Stevovic"} />
    </>
  );
};

export default SectionStevo;
