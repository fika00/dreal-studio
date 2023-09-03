import { Html, Image } from "@react-three/drei";
import fragmentShader from "./shaders/balsaOutlineFragment.glsl";
import vertexShader from "./shaders/balsaOutlineVertex.glsl";
import balsaOutline from "/imgs/balsa/Balsa_outline.png";
import { TextureLoader } from "three";

const BalsaOutline = () => {
  const degToRad = (deg) => {
    return deg * 0.0174533;
  };
  const loader = new TextureLoader();
  const balsaTexture = loader.load(balsaOutline);
  return (
    <>
      {/* <mesh>
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
      </mesh> */}
      <group scale={0.6}>
        <Image
          position={[0, -0.15, 0]}
          scale={[0.7, 2 / 2, 1 / 2]}
          url={balsaOutline}
          transparent
        />
      </group>
    </>
  );
};

export default BalsaOutline;
