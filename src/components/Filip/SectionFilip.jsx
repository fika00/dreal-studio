import { Canvas, extend, useFrame } from "@react-three/fiber";
import { data } from "./components/data";
import { dataHeart } from "./components/dataHeart";
import { dataHead } from "./components/dataHead";

import * as THREE from "three";
import {
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
// declaratively
import { useEffect, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Loading from "../Loading/Loading";
import CurveToMesh from "./components/CurveToMesh";

const CamMovement = () => {
  function mapRange(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }
  const groupRef = useRef();
  const scroll = useScroll();
  const camRef = useRef();
  console.log(scroll);
  useFrame((state, delta) => {
    camRef.current.position.y = mapRange(scroll.offset, 0, 1, -1.5, -15);
    groupRef.current.rotation.y += 0.2 * delta;
  });
  return (
    <>
      <group ref={groupRef} position={[0, 0, 2]}>
        <PerspectiveCamera
          ref={camRef}
          position={[0, -1.5, 20]}
          fov={15}
          makeDefault
        />
      </group>
    </>
  );
};

const SectionFilip = () => {
  return (
    <>
      <Canvas>
        <ScrollControls pages={4}>
          <CamMovement />
        </ScrollControls>
        <group rotation={[0, 0, 0]} position={[0, -1, 2.5]}>
          <CurveToMesh
            data={dataHead}
            materialColor={"cyan"}
            materialColor2={"black"}
            thick={0.002}
          />
        </group>
        <group
          rotation={[degToRad(-90), 0, 0]}
          scale={0.1}
          position={[0, -10, 1.5]}
        >
          <CurveToMesh
            data={dataHeart}
            materialColor={"red"}
            materialColor2={"black"}
            thick={0.02}
          />
        </group>
        <group
          rotation={[degToRad(-30), 0, degToRad(180)]}
          position={[0, -15, 2.5]}
        >
          <CurveToMesh
            data={data}
            materialColor={"cyan"}
            materialColor2={"blue"}
            thick={0.0025}
          />
        </group>

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={2} mipmapBlur />
        </EffectComposer>
        {/* <OrbitControls /> */}
      </Canvas>
      <Loading />
    </>
  );
};

export default SectionFilip;
