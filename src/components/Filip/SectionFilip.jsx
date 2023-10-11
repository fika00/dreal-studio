import { Canvas, extend, useFrame } from "@react-three/fiber";
import { data } from "./components/data";
import { dataHeart } from "./components/dataHeart";
import { dataHead } from "./components/dataHead";
import { getProject, val } from "@theatre/core";
import * as THREE from "three";
import {
  Html,
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
import gsap from "gsap";

import "./SectionFilip.scss";

import HeroTextAnim from "./components/HeroTextAnim";
import ButtonDreal from "./components/ButtonDreal/ButtonDreal";

import outlineFragmentShader from "./components/shaders/outlineFragmentShader.glsl";
import outlineVertexShader from "./components/shaders/outlineVertexShader.glsl";

import heartFragmentShader from "./components/shaders/heartFragmentShader.glsl";
import heartVertexShader from "./components/shaders/heartVertexShader.glsl";
import Icon from "./components/Icon/Icon";
import HeroContainer from "./components/HeroContainer/HeroContainer";
import SmallNav from "./components/SmallNav/SmallNav";
import AboutMe from "./components/AboutMe/AboutMe";
import Hobbies from "./components/Hobbies/Hobbies";
import Work from "./components/Work/Work";
import VideoPlane from "./components/VideoPlane/VideoPlane";
import VideoSlide from "./components/VideoSlide/VideoSlide";

const SectionFilip = ({ isPhone }) => {
  const camRef = useRef();
  const camMovementRef = useRef();
  const nameRef = useRef();
  const smallNavRef = useRef();
  const heroRef = useRef();
  const aboutMeRef = useRef();
  const hobbiesRef = useRef();
  const workRef = useRef();
  const videoplaneRef = useRef();

  const posData = [
    [
      [0.5, -1.51, 3.579],
      [0.48, 0.47, 0],
    ],
    [
      [-1.56, -1.51, 5.69],
      [0, -0.59, 0],
    ],
    [
      [-0.039, -8.79, 5.01],
      [-0.009, -0.065, 0.0],
    ],
    [
      [0, -14.764, 7.552],
      [-0.16, 0, 0],
    ],
    [
      [-0.039, -8.79, 2.4],
      [-0.3, 0.065, 0.0],
    ],
  ];

  const changeLocation = (location) => {
    const loc = posData[location];

    const sections = [null, aboutMeRef, hobbiesRef, workRef];

    if (location != 0) {
      smallNavRef.current.setIsVisible(true);
    } else {
      smallNavRef.current.hideSmallNav();
      heroRef.current.setIsVisible(true);
    }
    sections.forEach((section, index) => {
      if (index == location && section != null) {
        setTimeout(() => {
          section.current.setIsVisible(true);
        }, 1000);
      } else if (section != null) {
        section.current.disappear();
      }
    });

    gsap.to(camRef.current.position, {
      x: loc[0][0],
      y: loc[0][1],
      z: loc[0][2],
      duration: 4,
      ease: "power3.inOut",
    });
    gsap.to(camRef.current.rotation, {
      x: loc[1][0],
      y: loc[1][1],
      z: loc[1][2],
      duration: 4,
      ease: "power3.inOut",
    });
  };

  return (
    <>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <group ref={camRef} position={posData[0][0]} rotation={posData[0][1]}>
          <PerspectiveCamera fov={45} makeDefault ref={camMovementRef} />
        </group>
        {/* <SheetProvider sheet={sheet}> */}
        <group rotation={[0, 0, 0]} position={[0, -1, 2.5]}>
          <CurveToMesh
            data={dataHead}
            pulsingSpeed={1}
            materialColor={"cyan"}
            materialColor2={"black"}
            thick={0.002}
            fragment={outlineFragmentShader}
            vertex={outlineVertexShader}
          />
        </group>
        <group
          rotation={[degToRad(-90), 0, 0]}
          scale={0.1}
          position={[0, -10, 1.5]}
        >
          <CurveToMesh
            pulsingSpeed={2}
            data={dataHeart}
            materialColor={"red"}
            materialColor2={"black"}
            thick={0.02}
            fragment={heartFragmentShader}
            vertex={heartVertexShader}
          />
          <group
            scale={2}
            position={[-0.5, -1, 9]}
            rotation={[degToRad(-15), 0, degToRad(5)]}
          >
            <VideoPlane ref={videoplaneRef} />
          </group>
        </group>
        <group
          rotation={[degToRad(-30), 0, degToRad(180)]}
          position={[0, -15, 2.5]}
        >
          <CurveToMesh
            data={data}
            pulsingSpeed={3}
            materialColor={"cyan"}
            materialColor2={"blue"}
            thick={0.0025}
            fragment={outlineFragmentShader}
            vertex={outlineVertexShader}
          />
        </group>
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} intensity={1} mipmapBlur />
        </EffectComposer>
        {/* <OrbitControls /> */}
        {/* </SheetProvider> */}
      </Canvas>

      <div className="html_container">
        <HeroContainer
          ref={heroRef}
          onCallback={(section) => changeLocation(section)}
        />
        <SmallNav
          isPhone={isPhone}
          ref={smallNavRef}
          onClickCallback={(sec) => changeLocation(sec)}
        />
        <AboutMe ref={aboutMeRef} />
        <Hobbies
          ref={hobbiesRef}
          onCallback={() => {
            changeLocation(4);
            videoplaneRef.current.appear();
          }}
        />
        <Work ref={workRef} />
        {/* <VideoSlide /> */}
      </div>

      <Loading />
    </>
  );
};

export default SectionFilip;
