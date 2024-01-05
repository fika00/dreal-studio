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

import smoke from "/imgs/studi/smoke.jpg";
import { AtmosphericBloom } from "./SmokyBloom/AtmosphericBloom";
import { useEffect, useRef } from "react";

const PP = () => {
  const smokeTexture = useTexture(smoke);
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
        mipmapBlur
        intensity={1}
        luminanceThreshold={0.5}
        ref={bloomRef}
      />
    </EffectComposer>
  );
};

export default PP;
