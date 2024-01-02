import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Canvas, extend } from "@react-three/fiber";

import { Effects } from "@react-three/drei";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

extend({ UnrealBloomPass, OutputPass });

const PP = () => {
  return (
    <Effects disableGamma>
      <unrealBloomPass threshold={0.8} strength={1} radius={1} />
      <outputPass args={[THREE.ACESFilmicToneMapping]} />
    </Effects>
  );
};

export default PP;
