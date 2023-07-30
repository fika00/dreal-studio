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
  EffectComposer,
  Select,
  Selection,
  SelectiveBloom,
} from "@react-three/postprocessing";

//

import { useControls } from "leva";
import { TextureLoader } from "three";
import { Depth, Gradient, LayerMaterial } from "lamina";
import Reel from "./components/Reel";
import Cloud from "./components/Cloud";

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
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 2,
      fog: true,
    }),
    [waterNormals]
  );
  useFrame((state) => (ref.current.material.uniforms.time.value += 0.005));
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}

const DoorWay = () => {
  return (
    <Select enabled={true}>
      <group scale={7}>
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[4.1, 0.1, 0.1]} />
          <meshStandardMaterial emissive={"cyan"} emissiveIntensity={1} />
        </mesh>
        <mesh position={[2, 2.5, 0]}>
          <boxGeometry args={[0.1, 5, 0.1]} />
          <meshStandardMaterial emissive={"cyan"} emissiveIntensity={1} />
        </mesh>
        <mesh position={[-2, 2.5, 0]}>
          <boxGeometry args={[0.1, 5, 0.1]} />
          <meshStandardMaterial emissive={"cyan"} emissiveIntensity={1} />
        </mesh>
      </group>
    </Select>
  );
};

const Scene = () => {
  const scroll = useScroll();

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  return (
    <>
      <fog attach="fog" args={["#3c61bc", 20, 500]} />

      <PerspectiveCamera
        makeDefault
        position={[0, 10, 55]}
        fov={90}
        near={0.1}
      />
      <Ocean />

      <mesh position={[0, -1, 0]} scale={7020} rotation={[degToRad(-90), 0, 0]}>
        <planeGeometry />
        {/* <meshBasicMaterial emissive={"cyan"} /> */}
        <meshBasicMaterial color={"black"} />
      </mesh>
    </>
  );
};

const SectionStudi = () => {
  const meshTestKurac = useRef();

  const lightRef = useRef();

  const loader = new TextureLoader();
  const skyTexture = loader.load("/imgs/studi/sky2.jpg");

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };
  // const { intensity, radius } = useControls({
  //   intensity: { value: 5, min: 0, max: 10, step: 0.01 },
  //   radius: { value: 0.1, min: 0, max: 1, step: 0.01 },
  // });
  const cloudTextureRose = loader.load("/imgs/studi/cloud_r.png");
  const cloudTextureBlue = loader.load("/imgs/studi/cloud_b.png");

  return (
    <>
      <Canvas>
        <ScrollControls pages={5}>
          <Scene />
          <pointLight position={[-10, -10, -10]} />
          <Selection>
            <EffectComposer>
              <SelectiveBloom
                mipmapBlur
                radius={0.75}
                luminanceThreshold={0.5}
                intensity={5}
              />
            </EffectComposer>
            <DoorWay />
            <Reel />
          </Selection>
          <Sparkles
            noise={6}
            speed={6}
            color={"cyan"}
            position={[0, 10, 0]}
            count={600}
            size={10}
            scale={100}
          />
          <mesh position={[0, 350, -200]} scale={750}>
            <planeGeometry args={[2.22, 1]} />
            <meshBasicMaterial map={skyTexture} />
          </mesh>
        </ScrollControls>

        {/* <group scale={25} position={[-100, 140, -170]}>
          <Cloud color={cloudTextureRose} />
        </group>
        <group scale={25} position={[-400, 160, -130]}>
          <Cloud color={cloudTextureBlue} />
        </group>
        <group scale={[-25, 25, 25]} position={[300, 160, -110]}>
          <Cloud color={cloudTextureBlue} />
        </group> */}
        <OrbitControls />
        <Stats />
      </Canvas>
    </>
  );
};

export default SectionStudi;
