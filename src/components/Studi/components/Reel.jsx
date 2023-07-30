import { TextureLoader } from "three";
import studiFragment from "./shaders/studiFragment.glsl";
import studiVertex from "./shaders/studiVertex.glsl";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Reel = () => {
  const loader = new TextureLoader();
  const noise = loader.load("/imgs/studi/curl.jpg");
  const planeRef = useRef();

  let timeVar = 0;
  useFrame(() => {
    timeVar += 0.01;
    planeRef.current.material.uniforms.uTime.value = timeVar;
  });

  const handleWaveReset = () => {
    timeVar = 0;
  };
  return (
    <>
      <mesh ref={planeRef} scale={28} position={[0, 17, 0]}>
        <planeGeometry args={[1, 1.32]} />
        <shaderMaterial
          uniforms={{
            noise: { value: noise },
            uTime: { value: 0 },
          }}
          transparent={true}
          vertexShader={studiVertex}
          fragmentShader={studiFragment}
        />
      </mesh>
      <Html scale={15} transform position={[30, 40, 0]}>
        <button onClick={handleWaveReset}>Reset Wave</button>
      </Html>
    </>
  );
};

export default Reel;
