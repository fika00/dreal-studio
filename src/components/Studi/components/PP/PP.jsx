import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Canvas, extend, useFrame } from "@react-three/fiber";

import { Effects, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import smoke from "/imgs/studi/smoke2.jpg";
import smoke2 from "/imgs/studi/smoke3.jpg";
import { AtmosphericBloom } from "./SmokyBloom/AtmosphericBloom";
import { useEffect, useRef } from "react";

const PP = () => {
  const smokeTexture = useTexture(smoke);
  const smokeTexture2 = useTexture(smoke2);

  const bloomRef = useRef();
  useFrame((state, delta) => {
    bloomRef.current.uniforms.get("smokeUTime").value += 0.1 * delta;
  });
  useEffect(() => {
    const smokeUTimeValue = bloomRef.current.uniforms.get("smokeUTime").value;
    console.log(smokeUTimeValue);
  }, []);
  return (
    <EffectComposer>
      <AtmosphericBloom
        maskTexture={smokeTexture}
        maskTexture2={smokeTexture2}
        mipmapBlur
        intensity={2.5}
        luminanceThreshold={0.5}
        ref={bloomRef}
      />
    </EffectComposer>
  );
};

export default PP;
