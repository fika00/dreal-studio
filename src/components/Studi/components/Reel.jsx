import { TextureLoader } from "three";
import studiFragment from "./shaders/studiFragment.glsl";
import studiVertex from "./shaders/studiVertex.glsl";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Select } from "@react-three/postprocessing";

const Reel = () => {
  const loader = new TextureLoader();
  const noise = loader.load("/imgs/studi/curl.jpg");
  const picture1 = loader.load("/imgs/studi/content/slika1.jpg");
  const picture2 = loader.load("/imgs/studi/content/slika2.jpg");

  const planeRef = useRef();

  let timeVar = 0;
  useFrame(() => {
    timeVar += 0.005;
    planeRef.current.material.uniforms.uTime.value = timeVar;
  });

  const handleWaveReset = () => {
    timeVar = 0;
  };
  return (
    <>
      <Select enabled={true}>
        <mesh ref={planeRef} scale={28} position={[0, 17, 0]}>
          <planeGeometry args={[1, 1.3]} />
          <shaderMaterial
            toneMapped={false}
            uniforms={{
              noise: { value: noise },
              uTime: { value: 0 },
              pic1: { value: picture1 },
              pic2: { value: picture2 },
            }}
            transparent={true}
            vertexShader={studiVertex}
            fragmentShader={studiFragment}
          />
        </mesh>
      </Select>
      {/* <Html scale={15} transform position={[30, 40, 0]}>
        <button onClick={handleWaveReset}>Reset Wave</button>
      </Html> */}
    </>
  );
};

export default Reel;
