import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useVideoTexture } from "@react-three/drei";
import {
  TextureLoader,
  VideoTexture,
  LinearFilter,
  MeshBasicMaterial,
  DoubleSide,
} from "three";
import PlaneVideoMasked from "./planeVideoMasked";
import { gsap } from "gsap";
import "./SectionFilip.css";
import frontFragmentShaderInk from "./shaders/fragmentShaderAlpha.glsl";
import frontVertexShaderInk from "./shaders/vertexShaderAlpha.glsl";
import filip from "/imgs/filip/filipbg.jpg";
import ink from "/imgs/filip/inkblot.png";
import ink2 from "/imgs/filip/inkblot.jpg";

// NEW ALPHAS

import mask1 from "/imgs/filip/videocontent/alpha/mask1.mp4";
import mask3 from "/imgs/filip/videocontent/alpha/mask3.mp4";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
//11.614873
import inkvideo from "/imgs/filip/videocontent/alpha/inkblot_looped.webm";
import inkvideo_hevc from "/imgs/filip/videocontent/alpha/Inkblot_looped_hvec.mp4";
import { Depth, LayerMaterial, Gradient } from "lamina";
import { degToRad } from "three/src/math/MathUtils";

const Inkb = () => {
  const loader = new TextureLoader();
  const planeRef = useRef();

  const paper = loader.load("/imgs/filip/paper.jpg");

  const filip_outline = loader.load("/imgs/filip/outline.jpg");

  const [video] = useState(() => {
    const vid = document.createElement("video");
    // vid.src = inkvideo;
    vid.src = inkvideo;
    vid.src = inkvideo_hevc;

    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    // vid.autoplay = true;
    vid.play();
    vid.playsInline = true;
    vid.playbackRate = 1.5;
    return vid;
  });

  const [isReversing, setIsReversing] = useState(false);

  const videoTexture = new VideoTexture(video);

  const handlePlay = () => {
    video.currentTime = 0;
    video.play();
  };
  const handlePause = () => {
    video.pause();
    console.log(video.currentTime);
  };

  const handleReverse = () => {
    setIsReversing(!isReversing);
  };

  useFrame(() => {
    if (video.currentTime >= 14.33 && !isReversing) {
      video.currentTime = 10.867;
    }
  });

  const rewind = () => {
    const intervalRewind = setInterval(function () {
      video.pause();
      console.log(video.seeking);
      if (video.currentTime <= 0.3) {
        clearInterval(intervalRewind);
        video.play();
      } else {
        video.currentTime += -0.1;
      }
    }, 30);
  };

  return (
    <>
      <mesh ref={planeRef} scale={7}>
        <planeGeometry args={[1.77, 1]} />
        <shaderMaterial
          fragmentShader={frontFragmentShaderInk}
          vertexShader={frontVertexShaderInk}
          transparent={true}
          uniforms={{
            texture1: { value: filip_outline },
            texture2: { value: videoTexture },
          }}
        />
      </mesh>

      {/* <mesh ref={planeRef} scale={7}>
        <planeGeometry args={[1.77, 1]} />
        <shaderMaterial
          fragmentShader={fragmentShaderInk}
          vertexShader={vertexShaderInk}
          transparent={true}
          uniforms={{
            texture1: { value: txt1 },
            texture2: { value: videoTexture },
          }}
        />
      </mesh> */}
      {/* <PlaneVideoMasked mainTexture={transitionvideo} maskTexture={mask1} /> */}

      <Html transform position={[-4, 0, 0]}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReverse}>Reverse</button>
      </Html>
    </>
  );
};
// VideoPortfolio

import collection from "/imgs/filip/videocontent/collection.mp4";
import halls from "/imgs/filip/videocontent/halls.mp4";

import content2 from "/imgs/filip/videocontent/halls.mp4";

//Mask

import mask2 from "/imgs/filip/videocontent/alpha/Mask2collection_web_hevc2.mp4";

const SectionFilip = () => {
  // Controlling ref

  const videoRef = useRef();

  // const [bgvideo] = useState(() => {
  //   const vid = document.createElement("video");
  //   // vid.src = inkvideo;
  //   vid.src = "/imgs/filip/videocontent/alpha/mask9.mp4";

  //   vid.crossOrigin = "Anonymous";
  //   vid.loop = true;
  //   vid.muted = true;
  //   // vid.autoplay = true;
  //   vid.play();
  //   vid.playsInline = true;
  //   vid.playbackRate = 1.5;
  //   return vid;
  // });

  // const bgTexture = new VideoTexture(bgvideo);

  // useEffect(() => {
  //   bgvideo.play();
  // }, []);

  return (
    <div className="SectionFilip">
      <Canvas>
        <Inkb />
        {/* <PlaneVideoMasked
          mainTexture={collection}
          maskTexture={mask2}
          isInverted={false}
          ref={videoRef}
        /> */}
        <OrbitControls />

        <mesh scale={30} rotation={[degToRad(10), degToRad(20), degToRad(90)]}>
          <sphereGeometry />
          {/* <meshBasicMaterial side={DoubleSide} map={bgTexture} /> */}

          <LayerMaterial side={DoubleSide}>
            <Gradient colorA={"gray"} colorB={"black"} start={1} end={-0.5} />
          </LayerMaterial>
        </mesh>
      </Canvas>
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
        }}
      >
        <video
          src={inkvideo_hevc}
          controls
          autoPlay
          muted
          width={300}
          playsInline
        ></video>
      </div> */}
    </div>
  );
};

export default SectionFilip;
