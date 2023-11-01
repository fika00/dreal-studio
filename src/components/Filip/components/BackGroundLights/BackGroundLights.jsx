import { Environment, Lightformer } from "@react-three/drei";
import { gsap as g } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useImperativeHandle, forwardRef } from "react";

const BackGroundLightsFilip = (props, ref) => {
  useImperativeHandle(ref, () => ({
    showRed,
    hideRed,
  }));
  const [isRedVisible, setIsRedVisible] = useState(false);
  const redRef = useRef();
  const showRed = () => {
    if (!isRedVisible) {
      setIsRedVisible(true);
      g.to(redRef.current.material.color, {
        r: 0.4,
        ease: "power3.inOut",
        duration: 3,
      });
    }
  };
  const hideRed = () => {
    if (isRedVisible) {
      setIsRedVisible(false);

      g.to(redRef.current.material.color, {
        r: 0,
        ease: "power3.inOut",
        duration: 3,
      });
    }
  };

  return (
    <Environment frames={Infinity} background blur={0.6}>
      <group>
        <Lightformer
          form="rect" // circle | ring | rect (optional, default = rect)
          intensity={0.1} // power level (optional = 1)
          color="cyan" // (optional = white)
          position={[5, 1, -2]}
          scale={[3, 3]} // Scale it any way you prefer (optional = [1, 1])
          target={[0, 1, 0]} // Target position (optional = undefined)
        />
        <Lightformer
          ref={redRef}
          form="rect" // circle | ring | rect (optional, default = rect)
          intensity={0} // power level (optional = 1)
          color="orange" // (optional = white)
          position={[-3, 0, 0.5]}
          scale={[4, 3]} // Scale it any way you prefer (optional = [1, 1])
          target={[0, 0, 0]} // Target position (optional = undefined)
        />
      </group>
    </Environment>
  );
};

export default forwardRef(BackGroundLightsFilip);
