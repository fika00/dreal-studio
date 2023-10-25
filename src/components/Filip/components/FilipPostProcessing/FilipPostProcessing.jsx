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
import { UnrealBloomPass, HorizontalBlurShader } from "three-stdlib";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

extend({ UnrealBloomPass, OutputPass, HorizontalBlurShader });

const FilipPostProcessing = () => {
  return (
    <Effects disableGamma>
      <unrealBloomPass threshold={0.6} strength={0.4} radius={0.75} />
      <outputPass args={[THREE.ACESFilmicToneMapping]} />
    </Effects>
  );
};

export default FilipPostProcessing;
