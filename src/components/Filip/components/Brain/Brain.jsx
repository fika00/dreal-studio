import { Point, Points, Trail } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
const PointTrail = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    fadeIn,
    fadeOut,
  }));
  const [isVisible, setIsVisible] = useState(false);

  const fadeIn = (seconds) => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        gsap.to(trailRef.current.material.color, {
          r: 7,

          duration: 3,
          ease: "power1.inOut",
        });
      }, 750);
    }
  }, [isVisible]);
  const fadeOut = (seconds) => {
    if (isVisible) {
      gsap.to(trailRef.current.material.color, {
        r: 0,

        duration: seconds,
        ease: "power1.inOut",
      });
    }

    setTimeout(() => {
      setIsVisible(false);
    }, seconds * 1000);
  };

  const pointRef = useRef();

  const groupRef = useRef();
  const trailRef = useRef();

  //   let time = 0;
  let time = Math.random() * 10;

  const scale = 0.1;

  useFrame((state, delta) => {
    time += delta * 2;

    pointRef.current.position.x =
      (Math.sin(time) + 2 * Math.sin(2 * time)) * scale;
    pointRef.current.position.y =
      (Math.cos(time) - 2 * Math.cos(2 * time)) * scale;
    pointRef.current.position.z = Math.sin(3 * time) * scale;

    groupRef.current.rotation.z += delta * 4;
  });
  return (
    <>
      <group ref={groupRef}>
        <mesh ref={pointRef} scale={0.1} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial opacity={0} transparent depthTest={false} />
        </mesh>
        {isVisible && (
          <Trail
            target={pointRef}
            ref={trailRef}
            width={0.2}
            length={8}
            color={new THREE.Color(0, 0, 0)}
            attenuation={(t) => t + 1 * Math.random() * t}
          ></Trail>
        )}
      </group>
    </>
  );
});

const Brain = ({ count }, ref) => {
  useImperativeHandle(ref, () => ({
    appear,
    disappear,
  }));

  const trailRef = useRef();

  const step = 6.28319 / count;

  const appear = () => {
    trailRef.current.fadeIn(1.5);
  };
  const disappear = () => {
    trailRef.current.fadeOut(1.5);
  };

  return <PointTrail ref={trailRef} />;
};

export default forwardRef(Brain);
