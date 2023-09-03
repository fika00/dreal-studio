import { Canvas, useFrame } from "@react-three/fiber";
import Eye from "./Eye";
import { Cloud, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import {
  PerspectiveCamera,
  Lightformer,
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import "./LandingPage.css";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  Noise,
  ToneMapping,
  SelectiveBloom,
} from "@react-three/postprocessing";
import Background from "./Background";
import TextTransitionSlide from "./TextTransitionSlide";
import { BlendFunction, KernelSize } from "postprocessing";
import { MeshBasicMaterial } from "three";
import logo from "/imgs/logo_fresh.svg";
import { gsap } from "gsap";
import ShootingStar from "./ShootingStar";
import Loading from "./Loading/Loading";

const LandingPage = ({ isPhone }) => {
  const eyeRef = useRef();
  const CamRef = useRef();
  const envRef = useRef();
  const headerRef = useRef();
  const [isTrailEnabled, setTrailEnabled] = useState(true);

  let eyeRot = [degToRad(6), degToRad(10), degToRad(90)];
  let eyePos = [-0.5, 0.3, -1];

  const [isPhoneScenario, setIsPhoneScen] = useState();
  useEffect(() => {
    // if (isPhone) {
    //   eyeRef.current.position.y = -1.45;
    // } else {
    // }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const slogan = document.getElementById("slogan");
      slogan.style.transform = "translateY(0%)";
    }, 500);

    setTimeout(() => {
      eyeRef.current.triggerUVEffect();
      headerRef.current.bringIn();
      gsap.to(CamRef.current.rotation, {
        x: 0,
        duration: 5,
        ease: "power3.inOut",
      });
    }, 4500);
  }, []);

  return (
    <div className="landingpage_wrapper">
      <Canvas>
        <group
          rotation={[degToRad(18), 0, 0]}
          ref={CamRef}
          position={[0, 0, 3.5]}
        >
          <PerspectiveCamera makeDefault fov={40} />
        </group>
        <Background />
        {/* <ShootingStar /> */}
        <Eye
          ref={eyeRef}
          rotation={[degToRad(-80), 0, 0]}
          position={[0, -1.15, 2.5]}
          scale={1.3}
        />
        <Sparkles size={0.6} scale={5} speed={0.05} count={300} opacity={0.5} />
        <Cloud
          scale={0.3}
          speed={0.7}
          position={[-3, -0.5, -1]}
          opacity={0.15}
          width={5}
          depth={1}
          segments={30}
        />
        <Cloud
          scale={0.3}
          speed={0.7}
          position={[3, -0.5, -1]}
          opacity={0.15}
          width={5}
          depth={1}
          segments={30}
        />
        {/* <Cloud scale={1} speed={0.2} position={[2.5, -2, -1]} opacity={1} /> */}
        <EffectComposer>
          <ToneMapping middleGrey={0.6} />
          <Noise premultiply blendFunction={BlendFunction.ADD} />
          <Bloom
            // mipmapBlur
            intensity={0.75}
            luminanceThreshold={0.35}
            kernelSize={KernelSize.VERY_LARGE}
          />
        </EffectComposer>
      </Canvas>
      <div className="landingtext">
        <div className="landingh">
          <TextTransitionSlide ref={headerRef} inputText={"Dreal Studio"} />
        </div>
        <div className="pcont"></div>
        <p id="slogan" className="slogan">
          The art of making dreams, real.
        </p>
      </div>
      <div className="navbar">
        <img src={logo} alt="" className="logo" />
      </div>
      <Loading name={"Dreal Studio"} />
    </div>
  );
};

export default LandingPage;
