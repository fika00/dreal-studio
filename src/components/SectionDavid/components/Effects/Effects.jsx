import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";

const Effects = () => {
  return (
    <EffectComposer renderPriority={1}>
      <ToneMapping middleGrey={0.3} />
      <Bloom intensity={0.5} luminanceThreshold={0.45} mipmapBlur />
    </EffectComposer>
  );
};

export default Effects;
