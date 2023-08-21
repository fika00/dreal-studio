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
} from "@react-three/drei";
import * as THREE from "three";
import { Water } from "three-stdlib";
import { useRef, useState } from "react";
import { useThree } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { useLoader } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { BlendFunction } from "postprocessing";
import { Fog } from "three";
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
// PostProcessing

import {
  Bloom,
  EffectComposer,
  Select,
  Selection,
  SelectiveBloom,
} from "@react-three/postprocessing";

//

import { useControls } from "leva";
import { TextureLoader } from "three";
import { Depth, Gradient, LayerMaterial } from "lamina";
import Reel from "./Reel";
import Cloud from "./Cloud";
import { ContentSlide } from "./ContentSlide";
import ReflectiveFloor from "./ReflectiveFloor";

extend({ Water, Fog: THREE.Fog });

function Ocean() {
  const ref = useRef();
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "/imgs/studi/Water_1_M_Normal.jpg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      // sunColor: 0x001e0f,
      waterColor: 0x001e0f,
      distortionScale: 2,
      // fog: true,
    }),
    [waterNormals]
  );
  useFrame((state) => (ref.current.material.uniforms.time.value += 0.005));
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}

const DoorWay = () => {
  return (
    <group scale={7}>
      {/* <mesh position={[0, 5, 0]}>
        <boxGeometry args={[4.1, 0.1, 0.1]} />
        <meshStandardMaterial color={"cyan"} />
      </mesh>
      <mesh position={[2, 2.5, 0]}>
        <boxGeometry args={[0.1, 5, 0.1]} />
        <meshStandardMaterial color={"cyan"} />
      </mesh>
      <mesh position={[-2, 2.5, 0]}>
        <boxGeometry args={[0.1, 5, 0.1]} />
        <meshStandardMaterial color={"cyan"} />
      </mesh> */}
      <mesh scale={2} position={[0, 2, 0]}>
        <planeGeometry args={[1, 2.5]} />
        <meshStandardMaterial color={"cyan"} />
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
      {/* <fog attach="fog" args={["#3c61bc", 20, 500]} /> */}

      {/* <PerspectiveCamera
        makeDefault
        position={[0, 10, 55]}
        fov={90}
        near={0.1}
      /> */}
      <Ocean />
      <mesh position={[0, -1, 0]} scale={7020} rotation={[degToRad(-90), 0, 0]}>
        <planeGeometry />
        <meshBasicMaterial color={"black"} />
      </mesh>
      {/* <group position={[0, 0, 20]} scale={100}>
        <ReflectiveFloor />
      </group> */}
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
  // const { intensity, radius } = useControls({
  //   intensity: { value: 5, min: 0, max: 10, step: 0.01 },
  //   radius: { value: 0.1, min: 0, max: 1, step: 0.01 },
  // });
  // const cloudTextureRose = loader.load("/imgs/studi/cloud_r.png");
  // const cloudTextureBlue = loader.load("/imgs/studi/cloud_b.png");

  return (
    <>
      <Scene />

      <DoorWay />
      {/* <Reel />
      <Sparkles
        noise={6}
        speed={2}
        color={"cyan"}
        position={[0, 10, 0]}
        count={600}
        size={10}
        scale={200}
      /> */}
      {/* <mesh position={[0, 350, -200]} scale={750}>
        <planeGeometry args={[2.22, 1]} />
        <meshBasicMaterial map={skyTexture} />
      </mesh> */}
      <ambientLight />

      {/* <group scale={25} position={[-100, 140, -170]}>
        <Cloud color={cloudTextureRose} />
      </group>
      <group scale={25} position={[-400, 160, -130]}>
        <Cloud color={cloudTextureBlue} />
      </group>
      <group scale={[-25, 25, 25]} position={[300, 160, -110]}>
        <Cloud color={cloudTextureBlue} />
      </group> */}

      <EffectComposer>
        <Bloom mipmapBlur radius={0.8} luminanceThreshold={0.6} intensity={6} />
      </EffectComposer>
    </>
  );
};

export default AboveWater;
