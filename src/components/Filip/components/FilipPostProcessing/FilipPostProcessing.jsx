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
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

extend({ UnrealBloomPass, OutputPass });

const FilipPostProcessing = () => {
  return (
    <Effects disableGamma>
      <unrealBloomPass
        threshold={0.3}
        strength={0.3}
        radius={1}
        // args={[THREE.SubtractiveBlending]}
      />
      <outputPass args={[THREE.ACESFilmicToneMapping]} />
    </Effects>
  );
};

export default FilipPostProcessing;
