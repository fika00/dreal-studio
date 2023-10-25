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

const PostProcessingEffects = () => {
  const which = false;

  return (
    <>
      {which ? (
        <EffectComposer>
          <ToneMapping middleGrey={0.3} />
          <Bloom intensity={0.5} luminanceThreshold={0.45} mipmapBlur />
          <Noise premultiply opacity={0.8} />
          <ChromaticAberration offset={[0.001, 0.00001]} />
        </EffectComposer>
      ) : (
        <Effects disableGamma>
          <unrealBloomPass
            threshold={0.65}
            strength={0.45}
            radius={1.5}
            mipmapBlur
          />
          <outputPass args={[THREE.ACESFilmicToneMapping]} />
        </Effects>
      )}
    </>
  );
};

export default PostProcessingEffects;
