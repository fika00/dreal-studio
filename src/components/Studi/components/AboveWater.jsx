import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  PerspectiveCamera,
  ScrollControls,
  OrbitControls,
  useScroll,
  Environment,
  Stars,
  Sparkles,
  Stats,
  Float,
  Image,
  MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";
// import { Water, Water2 } from "three-stdlib";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { useLoader } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { BlendFunction } from "postprocessing";
import { Fog } from "three";
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";

//* PostProcessing
import {
  Bloom,
  EffectComposer,
  Select,
  Selection,
  SelectiveBloom,
  Vignette,
} from "@react-three/postprocessing";

//
import { gsap } from "gsap";
import { useControls } from "leva";
import { TextureLoader } from "three";
import { Color, Depth, Gradient, LayerMaterial } from "lamina";
import Reel from "./Reel";
import Cloud from "./Cloud";
import { ContentSlide } from "./ContentSlide";
import { degToRad } from "three/src/math/MathUtils";
import { Water } from "./Water2";
import { MeshBasicMaterial } from "three";

extend({ Water, Fog: THREE.Fog });

function Ocean() {
  const nm = new TextureLoader().load("/imgs/studi/Water_1_M_Normal.jpg");
  let waterGeometry = new THREE.PlaneGeometry(20, 20);
  let waterMat = {
    scale: 20,
    textureWidth: 512,
    textureHeight: 512,
    flowSpeed: 0.02,
    reflectivity: 0.25,
  };
  return (
    <group scale={30} rotation={[degToRad(-90), 0, 0]}>
      <water args={[waterGeometry, waterMat]} />
    </group>
  );
}

const DoorWay = () => {
  const doorRef = useRef();
  useEffect(() => {
    console.log(doorRef.current.material.color);
    const animateLoop = () => {
      const dur = Math.random() / 2;
      gsap.to(doorRef.current.material.color, {
        g: 0.9,
        b: 0.9,
        duration: dur,
        ease: "power2.inOut",

        onComplete: () => {
          console.log(doorRef.current.material.color);
          gsap.to(doorRef.current.material.color, {
            g: 1,
            b: 1,
            duration: dur,
            ease: "power2.inOut",

            onComplete: () => {
              animateLoop();
            },
          });
        },
      });
    };
    animateLoop();
  }, []);
  return (
    <group scale={7}>
      <mesh ref={doorRef} scale={2} position={[0, 2, 5]}>
        <planeGeometry args={[1, 2.5]} />
        <meshStandardMaterial color={"cyan"} />
        {/* <meshStandardMaterial color={"#b5e1ff"} /> */}
      </mesh>
    </group>
  );
};

const Scene = () => {
  const scroll = useScroll();

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  return (
    <>
      {/* <PerspectiveCamera
        makeDefault
        position={[0, 10, 55]}
        fov={90}
        near={0.1}
      /> */}
      <Ocean />
      <mesh
        scale={550}
        rotation={[degToRad(-90), 0, 0]}
        position={[0, -0.1, 0]}
      >
        <planeGeometry />
        <meshStandardMaterial color={"black"} />
      </mesh>

      {/* <pointLight position={[-10, 0, 90]} /> */}
      <ambientLight />
    </>
  );
};

const AboveWater = () => {
  const meshTestKurac = useRef();

  const loader = new TextureLoader();
  const skyTexture = loader.load("/imgs/studi/sky2.jpg");

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  return (
    <>
      <Scene />

      <DoorWay />

      <EffectComposer>
        <Bloom
          mipmapBlur
          radius={0.75}
          luminanceThreshold={0.3}
          intensity={2.5}
        />
      </EffectComposer>

      {/* <OrbitControls /> */}

      <mesh position={[0, -60, 0]} scale={[150, 100, 150]}>
        <sphereGeometry />
        <LayerMaterial toneMapped={false} side={THREE.DoubleSide}>
          <Color color={"black"} />
        </LayerMaterial>
      </mesh>

      <Image
        scale={[10, 20, 1]}
        transparent
        position={[0, 8, 50]}
        url={"/imgs/studi/studi.png"}
      />

      <fog attach="fog" args={["#8ec3ef", 90, 500]} />
    </>
  );
};

export default AboveWater;
