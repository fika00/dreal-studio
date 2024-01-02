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
import { FXAAShader } from "three-stdlib";
import { ShaderPass } from "three-stdlib";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

extend({ UnrealBloomPass, OutputPass, DepthOfFieldEffect });

const LandingPagePPE = () => {
  const { gl, scene } = useThree();

  const pixelRatio = gl.getPixelRatio();
  const fxaaPass = new ShaderPass(FXAAShader);
  // fxaaPass.material.uniforms["resolution"].value.x =
  //   1 / (container.offsetWidth * pixelRatio); // fxaaPass.uniforms.resolution.value.y = window.innerHeight;
  const opPass = new OutputPass();
  opPass.args = [THREE.ACESFilmicToneMapping];

  const compRef = useRef();
  useEffect(() => {
    console.log("PIXEL RATIO:", pixelRatio);
    console.log(compRef.current);
    // compRef.current.addPass(fxaaPass);
    // compRef.current.addPass(opPass);
  }, []);
  return (
    <>
      <Effects disableGamma ref={compRef}>
        <unrealBloomPass
          threshold={0.2}
          strength={0.3}
          radius={0.5}
          mipmapBlur
        />

        <outputPass args={[THREE.ACESFilmicToneMapping]} />
      </Effects>
    </>
  );
};

export default LandingPagePPE;
