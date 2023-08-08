import { Canvas, extend } from "@react-three/fiber";
import { Cloud, OrbitControls, Sparkles, Stats } from "@react-three/drei";
import WireframeWave from "./components/WireframeWave";
import { DoubleSide } from "three";
import Triangle from "./components/Triangle";
import BalsaOutline from "./components/BalsaOutline";
import { gsap } from "gsap";

import { useControls } from "leva";
import {
  ChromaticAberration,
  Depth,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { useRef } from "react";
import { useEffect } from "react";

const SectionBalsa = () => {
  const degToRad = (deg) => {
    return deg * 0.0174533;
  };
  // const { focusDistance } = useControls({
  //   focusDistance: {
  //     min: 0,
  //     max: 0.1,
  //     value: 2,
  //     step: 0.0001,
  //   },
  // });

  const waveRef = useRef();
  const particleRef = useRef();

  const generateRandomXY = () => {
    const xCord = Math.floor(Math.random() * 200 - 100);
    const yCord = Math.floor(Math.random() * 200 - 100);
    particleRef.current.position.x = xCord;
    particleRef.current.position.z = yCord;
    waveRef.current.updateCords(xCord, yCord);

    particleRef.current.position.y = -9;

    handleParticleMovement();
  };
  const handleParticleMovement = () => {
    gsap.to(particleRef.current.position, {
      y: 6,
      duration: 2,
      ease: "power1.inOut",
      onComplete: () => {
        generateRandomXY();
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      generateRandomXY();
    }, 1000);
  }, []);

  const triangleElements = [];

  for (let i = 1; i < 6; i++) {
    triangleElements.push(
      <group
        key={i}
        scale={26}
        position={[0, -15, i * 19 * -1]}
        renderOrder={i}
      >
        <Triangle
          material={
            <meshBasicMaterial
              depthWrite={false}
              color={"black"}
              transparent
              opacity={0.3 - i ** 2 / 100}
              side={DoubleSide}
            />
          }
        />
      </group>
    );
  }
  return (
    <>
      <Canvas>
        {/* <fog attach="fog" color="gray" near={10} far={50} /> */}
        <WireframeWave ref={waveRef} />

        {/* PARTICLE */}

        <mesh scale={2.52} position={[0, -9, 0]} ref={particleRef}>
          <sphereGeometry />
          <meshBasicMaterial color={"hotpink"} />
        </mesh>

        {/* // */}

        <mesh scale={150}>
          <sphereGeometry />
          <meshBasicMaterial side={DoubleSide} color={"white"} />
        </mesh>

        {triangleElements}
        <group scale={0.3} position={[0, 0, 4.85]}>
          <group scale={[-1, 1, 1]} position={[0.45, 0, 0]}>
            <BalsaOutline />
          </group>
          <group position={[-0.45, 0, 0]}>
            <BalsaOutline />
          </group>
        </group>
        <Sparkles
          position={[0, 0, 3]}
          speed={0.05}
          count={300}
          scale={3}
          size={0.8}
          color={"black"}
          opacity={0.4}
        />
        <EffectComposer>
          {/* <DepthOfField
            focusDistance={0.01} // where to focus
            focalLength={0.08} // focal length
            bokehScale={0.5} // bokeh size
          /> */}
          <ChromaticAberration
            offset={[0.001, 0.0]} // color offset
          />
        </EffectComposer>
        <OrbitControls />
        <Stats />
      </Canvas>
    </>
  );
};

export default SectionBalsa;
