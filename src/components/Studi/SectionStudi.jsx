import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";

import Loading from "../Loading/Loading";
import Arm from "./components/Arm/Arm";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import mask from "/models/textures/Studi/tatoomask.png";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import EnvMap from "./components/EnvMap/EnvMap";
import PP from "./components/PP/PP";
const SectionStudi = () => {
  return (
    <>
      <Canvas>
        <PerspectiveCamera position={[0, 0, 7]} makeDefault />
        <Arm mask={mask} position={[-2, 2, 0]} scale={0.04} />
        <Arm mask={mask} position={[2, -2, 0]} scale={[-0.04, -0.04, 0.04]} />

        {/* <OrbitControls /> */}
        <EnvMap />
        <EffectComposer>
          <Bloom mipmapBlur intensity={2} luminanceThreshold={0.2} />
        </EffectComposer>
        {/* <PP /> */}
      </Canvas>

      <Loading />
    </>
  );
};

export default SectionStudi;
