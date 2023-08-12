import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  Trail,
  Cloud,
  OrbitControls,
  Sparkles,
  Stats,
} from "@react-three/drei";
import { DoubleSide } from "three";
import { gsap } from "gsap";
import "./SectionBalsa.css";
import { useControls } from "leva";
import {
  ChromaticAberration,
  Depth,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState, lazy } from "react";
import { useScroll } from "@react-three/drei";
import { ScrollControls } from "@react-three/drei";
import { Outline } from "@react-three/postprocessing";

//! COMPONENTS

import WireframeWave from "./components/WireframeWave";
import BalsaOutline from "./components/BalsaOutline";
import Triangle from "./components/Triangle";
import Loading from "../Loading/Loading";
import { Triangle2 } from "./components/Triangle2";

// const WireframeWave = lazy(() => import("./components/WireframeWave"));
// const Triangle = lazy(() => import("./components/Triangle"));
// const BalsaOutline = lazy(() => import("./components/BalsaOutline"));
// const Triangle2 = lazy(() => import("./components/Triangle2"));

const SectionBalsa = ({ isPhone }) => {
  const waveRef = useRef();
  const particleRef = useRef();
  const [dist, setDist] = useState(0.45);
  const contentTriangle = useRef();

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

  const generateRandomXY = () => {
    waveRef.current.resetWave();

    const xCord = Math.floor((Math.random() * 200 - 100) / 10);
    const yCord = Math.floor((Math.random() * 200 - 200) / 4);
    particleRef.current.position.x = xCord;
    particleRef.current.position.z = yCord;

    waveRef.current.updateCords(xCord, yCord);

    particleRef.current.position.y = -9;

    handleParticleMovement();
  };
  const handleParticleMovement = () => {
    gsap.to(particleRef.current.position, {
      y: 5.5,
      duration: 5,
      ease: "power2.in",
      onUpdate: () => {
        if (particleRef.current.position.y >= 5.5) {
          waveRef.current.startWave();
        }
      },
      onComplete: () => {
        gsap.to(particleRef.current.position, {
          y: 10,
          duration: 4,
          ease: "power2.Out",

          onComplete: () => {
            setTimeout(() => {
              generateRandomXY();
            }, 3000);
          },
        });
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
  useEffect(() => {
    console.log(isPhone);
    if (!isPhone) {
      setDist(0.45);
    } else {
      setDist(0.25);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<Loading name={"Balsa Ratkovic"} />}>
        {/* <fog attach="fog" color="gray" near={10} far={50} /> */}
        <WireframeWave ref={waveRef} />

        {/* PARTICLE */}
        <Trail
          width={0.5} // Width of the line
          color={"black"} // Color of the line
          attenuation={(width) => width} // A function to define the width in each point along it.
          target={particleRef}
        />
        <mesh scale={0.01} position={[0, -9, 0]} ref={particleRef}>
          <sphereGeometry />
          <meshBasicMaterial color={"black"} />
        </mesh>

        <mesh scale={150}>
          <sphereGeometry />
          <meshBasicMaterial side={DoubleSide} color={"white"} />
        </mesh>

        {triangleElements}
        <group scale={0.3} position={[0, 0, 4.85]}>
          <group scale={[-1, 1, 1]} position={[dist, 0, 0]}>
            <BalsaOutline />
          </group>
          <group position={[-dist, 0, 0]}>
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

        <Triangle2 triangleScale={isPhone ? 1.5 : 3} />
        <EffectComposer>
          <ChromaticAberration
            offset={[0.001, 0.0]} // color offset
          />
        </EffectComposer>
        {/* <OrbitControls /> */}
        <Stats />
      </Suspense>
    </>
  );
};

export default SectionBalsa;
