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
import { ToneMappingMode } from "postprocessing";
import { UnrealBloomPass } from "three-stdlib";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

extend({ UnrealBloomPass, OutputPass });

const LandingPagePPE = () => {
  return (
    <Effects disableGamma>
      <unrealBloomPass threshold={0.5} strength={0.3} radius={0.5} mipmapBlur />
      <outputPass args={[THREE.ACESFilmicToneMapping]} />
    </Effects>
  );
};

export default LandingPagePPE;
