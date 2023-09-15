import { Canvas, extend, useFrame } from "@react-three/fiber";
import { data } from "./components/data";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
// declaratively
import outlineFragmentShader from "./components/shaders/outlineFragmentShader.glsl";
import outlineVertexShader from "./components/shaders/outlineVertexShader.glsl";
import { useEffect, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const Tube = ({ curve }) => {
  const matRef = useRef();
  // useEffect(() => {
  //   console.log(matRef.current.material.uniforms.uTime.value);
  // }, []);
  useFrame(() => {
    matRef.current.material.uniforms.uTime.value += 0.01;
  });
  return (
    <mesh ref={matRef}>
      <tubeGeometry args={[curve, 64, 0.0025, 2, false]} />
      <shaderMaterial
        transparent
        depthTest={false}
        depthWrite={false}
        // wireframe={true}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        uniforms={{
          uTime: { value: 0 },
        }}
        fragmentShader={outlineFragmentShader}
        vertexShader={outlineVertexShader}
      />
    </mesh>
  );
};

const Tubes = () => {
  const randomRange = (min, max) => Math.random() * (max - min) + min;

  let curves = [];

  for (let i = 0; i < 100; i++) {
    let points = [];
    let len = randomRange(0.1, 1);
    for (let j = 0; j < 100; j++) {
      points.push(
        new THREE.Vector3().setFromSphericalCoords(
          1,
          Math.PI - (j / 100) * Math.PI * len,
          (i / 100) * Math.PI * 2
        )
      );
    }
    let curve = new THREE.CatmullRomCurve3(points);
    curves.push(curve);
  }

  let testCurves = [];

  // console.log(data);

  data.forEach((curve) => {
    console.log(curve);
    let testPoints = [];
    curve.forEach((coords) => {
      testPoints.push(new THREE.Vector3(coords[0], coords[1], coords[2]));
    });
    let tempCurve = new THREE.CatmullRomCurve3(testPoints);
    testCurves.push(tempCurve);
  });

  return (
    <>
      {testCurves.map((curveTemp, index) => (
        <Tube key={index} curve={curveTemp} />
      ))}
    </>
  );
};

const SectionFilip = () => {
  return (
    <>
      <Canvas>
        <group rotation={[degToRad(30), 0, 0]} position={[0, -1, 2.5]}>
          <Tubes />
        </group>
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={2} mipmapBlur />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default SectionFilip;
