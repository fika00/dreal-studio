import { Html, PerspectiveCamera } from "@react-three/drei";
// import { PerspectiveCamera } from "@react-three/fiber";
import AboveWater from "./components/AboveWater";
import BelowWater from "./components/BelowWater";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import Bridge from "./components/Bridge";
import Loading from "../Loading/Loading";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const SectionStudi = () => {
  const camRef = useRef();
  const [hasChanged, setHasChanged] = useState(false);
  const [isAbove, setIsAbove] = useState(false);
  const bgFade = useRef();
  const isReady = useRef(false);

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  const dive = () => {
    isReady.current = false;
    gsap.to(camRef.current.position, {
      y: -1,
      duration: 2.5,
      ease: "power2.in",
      onUpdate: () => {
        if (camRef.current.position.y <= 2) {
          bgFade.current.style.backgroundColor = "black";
          bgFade.current.style.zIndex = "unset";
        }
      },
      onComplete: () => {
        setIsAbove(!isAbove);
        isReady.current = false;
      },
    });
    gsap.to(camRef.current.rotation, {
      z: degToRad(90),
      duration: 2.5,
      ease: "power2.in",

      onComplete: () => {
        camRef.current.rotation.z = degToRad(-90);
      },
    });
  };
  const initiateEmerge = () => {
    if (
      camRef?.current?.position != null &&
      camRef?.current?.position != undefined
    ) {
      emerge();
    }
  };
  const emerge = () => {
    gsap.to(camRef.current.position, {
      y: 10,
      duration: 2.5,
      onUpdate: () => {
        if (camRef.current.position.y >= 1.5) {
          bgFade.current.style.backgroundColor = "transparent";
        }
      },
      onComplete: () => {
        bgFade.current.style.zIndex = -1;
      },
      ease: "power2.Out",
    });
    gsap.to(camRef.current.rotation, {
      z: 0,
      duration: 2.5,
      ease: "power2.Out",
    });
  };

  const show = () => {
    console.log("Bravo");
  };

  return (
    <>
      <Canvas dpr={0.75}>
        {/* <Html
        style={{
          opacity: 1,
        }}
        fullscreen
      >
        <div
          style={{
            position: "fixed",
          }}
        >
          <button onClick={dive}>Dive</button>

          <button onClick={emerge}>Emerge</button>
        </div>
      </Html> */}
        {/* <AboveWater /> */}

        {isAbove ? (
          <Suspense fallback={null}>
            <BelowWater />
          </Suspense>
        ) : (
          <Suspense fallback={null}>
            <AboveWater />
          </Suspense>
        )}

        {/* <Bridge callBackFunc={show} /> */}

        <PerspectiveCamera
          makeDefault
          position={[0, 10, 75]}
          fov={90}
          near={0.1}
          ref={camRef}
          exposure={2}
        />
      </Canvas>
      <div>
        <div
          ref={bgFade}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            transition: ".3s",
          }}
        ></div>
        <ChevronDownIcon
          width={40}
          style={{
            color: "white",
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => dive()}
        />
      </div>
      <Loading onReady={initiateEmerge} />
    </>
  );
};

export default SectionStudi;
