import { Html } from "@react-three/drei";
import fragmentShader from "../shaders/BalsaOutlineFragment.glsl";
import vertexShader from "../shaders/BalsaOutlineVertex.glsl";
import balsaOutline from "/imgs/balsa/balsa2.jpg";
import { TextureLoader } from "three";

const BalsaOutline = () => {
  const degToRad = (deg) => {
    return deg * 0.0174533;
  };
  const loader = new TextureLoader();
  const balsaTexture = loader.load(balsaOutline);
  return (
    <>
      <mesh>
        <planeGeometry args={[0.551, 1]} />
        <shaderMaterial
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          transparent
          uniforms={{
            balsaTexture: { value: balsaTexture },
          }}
        />
      </mesh>
    </>
  );
};

export default BalsaOutline;