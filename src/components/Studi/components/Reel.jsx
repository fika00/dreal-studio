import studiFragment from "./shaders/studiFragment.glsl";
import studiVertex from "./shaders/studiVertex.glsl";

const Reel = () => {
  return (
    <>
      <mesh scale={15} position={[0, 10, 0]}>
        <planeGeometry />
        <shaderMaterial
          vertexShader={studiVertex}
          fragmentShader={studiFragment}
        />
      </mesh>
    </>
  );
};

export default Reel;
