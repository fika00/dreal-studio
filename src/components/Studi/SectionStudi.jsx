import { Html, PerspectiveCamera } from "@react-three/drei";
// import { PerspectiveCamera } from "@react-three/fiber";
import AboveWater from "./components/AboveWater";
import BelowWater from "./components/BelowWater";
import { gsap } from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import Bridge from "./components/Bridge";

const SectionStudi = () => {
  const camRef = useRef();
  const [hasChanged, setHasChanged] = useState(false);
  const [isAbove, setIsAbove] = useState(false);

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };

  const dive = () => {
    gsap.to(camRef.current.position, {
      y: 0,
      duration: 2.5,
      ease: "power2.in",

      onComplete: () => {
        camRef.current.rotation.z = degToRad(180);
        setIsAbove(!isAbove);
        emerge();
      },
    });
  };

  const emerge = () => {
    gsap.to(camRef.current.position, {
      y: 10,
      duration: 2.5,
      ease: "power2.Out",
    });
    gsap.to(camRef.current.rotation, {
      z: 0,
      duration: 5,
      ease: "power2.inOut",
    });
  };

  const show = () => {
    console.log("Bravo");
  };

  return (
    <>
      <Html
        style={{
          opacity: 1,
        }}
        center
      >
        <div
          style={{
            position: "fixed",
          }}
        >
          {/* <button onClick={() => setIsAbove(!isAbove)}>Dive</button> */}
          <button onClick={dive}>Dive</button>

          <button onClick={emerge}>Emerge</button>
        </div>
      </Html>
      {/* <AboveWater /> */}

      {isAbove ? (
        <Suspense fallback={null}>
          <AboveWater />
        </Suspense>
      ) : (
        <Suspense fallback={null}>
          <BelowWater />
        </Suspense>
      )}

      <Bridge callBackFunc={show} />

      <PerspectiveCamera
        makeDefault
        position={[0, 10, 75]}
        fov={90}
        near={0.1}
        ref={camRef}
        exposure={2}
      />
    </>
  );
};

export default SectionStudi;
