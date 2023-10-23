import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Effects = () => {
  return (
    <EffectComposer>
      <ToneMapping middleGrey={0.3} />
      <Bloom intensity={0.5} luminanceThreshold={0.45} mipmapBlur />
      <Noise premultiply opacity={0.8} />
      <ChromaticAberration offset={[0.001, 0.00001]} />
    </EffectComposer>
  );
};

export default Effects;
