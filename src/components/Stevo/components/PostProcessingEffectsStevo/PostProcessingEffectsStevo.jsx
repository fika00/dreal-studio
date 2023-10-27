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

const PostProcessingEffectsStevo = () => {
  return (
    <>
      <Effects disableGamma>
        <unrealBloomPass
          threshold={0.5}
          strength={0.75}
          radius={1}
          mipmapBlur
        />
        <outputPass args={[THREE.ACESFilmicToneMapping]} />
      </Effects>
    </>
  );
};

export default PostProcessingEffectsStevo;
