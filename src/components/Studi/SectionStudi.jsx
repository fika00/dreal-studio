import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";

import Loading from "../Loading/Loading";
import Arm from "./components/Arm/Arm";
import {
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import mask from "/models/textures/Studi/tatoomask.png";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import EnvMap from "./components/EnvMap/EnvMap";
// import PP from "./components/PP/PP";
import Smoke from "./components/Smoke/Smoke";
import "./SectionStudi.scss";

// import demo1 from "/imgs/studi/content/video/demo1.mp4";
// import demo2 from "/imgs/studi/content/video/demo2.mp4";
import { AtmosphericBloom } from "./components/PP/SmokyBloom/AtmosphericBloom";
import smoke from "/imgs/studi/curl.png";
import PP from "./components/PP/PP";

const SectionStudi = () => {
  return (
    <>
      {/* <div className="media-container">
        <div className="media-container-upper">
          <video
            loop
            muted
            autoPlay
            src={demo1}
            className="media-container-video"
          />
        </div>
        <div className="media-container-lower">
          <video
            loop
            muted
            autoPlay
            src={demo2}
            className="media-container-video"
          />
        </div>
      </div> */}
      <Canvas>
        <PerspectiveCamera position={[0, 0, 5.5]} makeDefault />
        <Arm mask={mask} position={[-2, 2, 0]} scale={0.04} />
        <Arm mask={mask} position={[2, -2, 0]} scale={[-0.04, -0.04, 0.04]} />

        {/* <OrbitControls /> */}
        <EnvMap />
        {/* <Smoke /> */}

        <PP />
      </Canvas>

      {/* <div className="hit-boxes">
        <div className="hit-boxes-upper"></div>
        <div className="hit-boxes-lower"></div>
      </div> */}

      <Loading />
    </>
  );
};

export default SectionStudi;
