import { useTexture } from "@react-three/drei";
import smoke from "/imgs/studi/curl.png";
import smokeFragment from "./shaders/SmokeFragment.glsl";
import smokeVertex from "./shaders/SmokeVertex.glsl";
import * as THREE from "three";
const Smoke = () => {
  const smokeTexture = useTexture(smoke);
  return (
    <mesh>
      <planeGeometry args={[5, 5]} />
      <shaderMaterial
        blending={THREE.SoftLi}
        depthWrite={false}
        // transparent
        fragmentShader={smokeFragment}
        vertexShader={smokeVertex}
        uniforms={{
          uTexture: { value: smokeTexture },
        }}
      />
    </mesh>
  );
};

export default Smoke;
