import { Point, Points, Trail } from "@react-three/drei";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
const PointTrail = (color) => {
  const pointRef = useRef();

  const groupRef = useRef();

  //   let time = 0;
  let time = Math.random() * 70;

  let speed = Math.random() + 0.5;

  useFrame((state, delta) => {
    time += delta * speed;

    pointRef.current.position.z = Math.sin(time) * 7;
    pointRef.current.position.x = Math.cos(time) * 3;
    // groupRef.current.rotation.x += (delta / 10) * speed;
    // groupRef.current.rotation.z += (delta / 4) * speed;
  });
  return (
    <>
      <group ref={groupRef}>
        <mesh ref={pointRef} scale={0.1} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            blending={THREE.AdditiveBlending}
            opacity={0}
            transparent
            depthTest={false}
          />
        </mesh>
        <Trail
          transparent
          target={pointRef}
          width={1}
          length={8}
          color={"#a5e7e5"}
          attenuation={(t) => t * t}
        ></Trail>
      </group>
    </>
  );
};

const BackgroundParticles = ({ count }) => {
  const trailArr = [];

  const col = new THREE.Color(0.65, 0.91, 0.9);
  //.65 .91 .9
  //7 0 0

  const step = 6.28319 / count;

  for (let i = 0; i <= count; i++) {
    trailArr.push(
      <group
        key={i}
        position={[0, (i + 1) * -2, 0]}
        // rotation={[i + 1 * step, 0, 0]}
      >
        <PointTrail color={col} />
      </group>
    );
  }
  return (
    <>
      <group position={[0, 6, -3]}>{trailArr}</group>
    </>
  );
};

export default BackgroundParticles;
