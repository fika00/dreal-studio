import fragmentShaderInk from "./shaders/fragmentAlpha.glsl";
import vertexShaderInk from "./shaders/vertexShaderAlpha.glsl";
import { useImperativeHandle, forwardRef } from "react";

import { VideoTexture } from "three";
import { useState, useEffect, useRef } from "react";
import { Html, useFBO } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const PlaneVideoMasked = ({ mainTexture, maskTexture, isInverted }, ref) => {
  useImperativeHandle(ref, () => ({
    playMask,
    pauseMask,
  }));

  const [mainVid] = useState(() => {
    const vid = document.createElement("video");
    vid.src = mainTexture;

    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    // vid.autoplay = true;
    vid.play();
    vid.playsInline = true;
    vid.playbackRate = 1;
    return vid;
  });

  const [maskText] = useState(() => {
    const vid = document.createElement("video");
    vid.src = maskTexture;

    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    // vid.autoplay = true;
    vid.play();
    vid.playsInline = true;
    vid.playbackRate = 1.5;
    return vid;
  });

  const mainVideoTexture = new VideoTexture(mainVid);
  const maskVideoTexture = new VideoTexture(maskText);

  // Mask Control settings

  const playMask = () => {
    mainVid.play();
    maskText.play();
  };
  const pauseMask = () => {
    mainVid.pause();
    maskText.pause();
  };

  const maskTimestamps = [
    [0, 1.74, 3.9, 5.67],
    [5.713, 7.76, 8.76, 10.8],
    [10.85, 12.5, 13.46, 15.117],
    [15.117, 19.7, 22.7, 27.1],
  ];

  const reelTimestamps = [
    [0, 10.4],
    [10.4, 21.08],
    [21.08, 32, 0.955],
  ];
  // const mask1 = [0, 1.74, 2.82, 3.9, 5.67]
  // const mask2 = [5.713, 7.76, 8.26, 8.76, 10.8]
  // const mask3 = [10.85, 12.5, 12.98, 13.46, 15.117]
  // const mask4 = [15.117, 19.7, 21.2, 22.7, 27.2]

  const [currentMask, setCurrentMask] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  const [isReversing, setIsReversing] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleNextMask = () => {
    maskText.playbackRate = 1;
    setIsChanging(true);
  };
  const slowedRate = 0.65;
  useFrame(() => {
    if (!isChanging && maskText.currentTime >= maskTimestamps[currentMask][2]) {
      if (maskText.playbackRate != slowedRate) {
        maskText.playbackRate = slowedRate;
      }
      maskText.currentTime = maskTimestamps[currentMask][1];
    }
    if (mainVid.currentTime >= reelTimestamps[currentVideo][1]) {
      mainVid.currentTime = reelTimestamps[currentVideo][0];
    }
    if (isChanging) {
      if (maskText.currentTime >= maskTimestamps[currentMask][3]) {
        let next_mask = Math.floor(Math.random() * 4);
        let next_video;
        if (currentVideo < 2) {
          next_video = currentVideo + 1;
        } else {
          next_video = 0;
        }
        console.log(next_mask);
        maskText.currentTime = maskTimestamps[next_mask][0];
        mainVid.currentTime = reelTimestamps[next_video][0];
        setCurrentMask(next_mask);
        setCurrentVideo(next_video);
        setIsChanging(false);
      }
    }
  });

  return (
    <>
      <mesh scale={7}>
        <planeGeometry args={[1.77, 1]} />
        <shaderMaterial
          fragmentShader={fragmentShaderInk}
          vertexShader={vertexShaderInk}
          transparent={true}
          uniforms={{
            texture1: { value: mainVideoTexture },
            texture2: { value: maskVideoTexture },
            invert: { value: isInverted },
          }}
        />
      </mesh>

      <Html position={[0, 7, 0]}>
        <button onClick={playMask}>Play</button>
        <button onClick={pauseMask}>Pause</button>
        <button onClick={handleNextMask}>NextMask</button>
      </Html>
    </>
  );
};

export default forwardRef(PlaneVideoMasked);
