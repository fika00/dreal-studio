import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Canvas, extend } from "@react-three/fiber";

import { Effects } from "@react-three/drei";
import * as THREE from "three";
import { ToneMappingMode, DepthOfFieldEffect } from "postprocessing";
import { UnrealBloomPass } from "three-stdlib";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

extend({ UnrealBloomPass, OutputPass, DepthOfFieldEffect });

const LandingPagePPE = () => {
  return (
    <>
      <Effects disableGamma>
        <unrealBloomPass
          threshold={0.2}
          strength={0.3}
          radius={0.5}
          mipmapBlur
        />
        {/* <depthOfFieldEffect /> */}

        <outputPass args={[THREE.ACESFilmicToneMapping]} />
      </Effects>
    </>
  );
};

export default LandingPagePPE;
