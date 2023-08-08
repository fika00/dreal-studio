import WaveVertex from "../shaders/WaveVertex.glsl";
import WaveFragment from "../shaders/WaveFragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide } from "three";
import { useImperativeHandle, forwardRef } from "react";

const WireframeWave = (props, ref) => {
  useImperativeHandle(ref, () => ({
    updateCords,
  }));
  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  const updateCords = (xCord, yCord) => {
    console.log(xCord, yCord);
    waveRef2.current.material.uniforms.xCord.value = xCord;
    waveRef2.current.material.uniforms.yCord.value = yCord;
  };

  const waveRef = useRef();
  const waveRef2 = useRef();

  const uTime = 0.05;

  useFrame(() => {
    waveRef.current.material.uniforms.uTime.value += uTime;
    waveRef2.current.material.uniforms.uTime.value += uTime;

    // console.log(waveRef.current.material.uniforms);
  });

  return (
    <>
      <mesh
        rotation={[degToRad(-90), 0, 0]}
        position={[0, 5.5, 0]}
        ref={waveRef2}
      >
        <planeGeometry args={[200, 200, 150 * 2, 50 * 2]} />
        <shaderMaterial
          side={DoubleSide}
          depthWrite={false}
          fragmentShader={WaveFragment}
          vertexShader={WaveVertex}
          // wireframe
          transparent
          // linewidth={10}
          uniforms={{
            uTime: { value: 0 },
            xCord: { value: 0 },
            yCord: { value: 0 },
          }}
        />
      </mesh>
      <points
        rotation={[degToRad(-90), 0, 0]}
        position={[0, -10, 0]}
        ref={waveRef}
      >
        <planeGeometry args={[200, 200, 150 * 2, 50 * 2]} />
        <shaderMaterial
          fragmentShader={WaveFragment}
          vertexShader={WaveVertex}
          // wireframe
          transparent
          // linewidth={10}
          uniforms={{
            uTime: { value: 0 },
          }}
        />
      </points>
    </>
  );
};

export default forwardRef(WireframeWave);