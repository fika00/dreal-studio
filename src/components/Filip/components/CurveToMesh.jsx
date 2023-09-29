import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Tube = ({
  curve,
  materialColor,
  materialColor2,
  thick,
  vertex,
  pulsingSpeed,
  fragment,
}) => {
  const matRef = useRef();
  // useEffect(() => {
  //   console.log(matRef.current.material.uniforms.uTime.value);
  // }, []);
  useFrame((state, delta) => {
    matRef.current.material.uniforms.uTime.value += 0.2 * delta * pulsingSpeed;
  });
  return (
    <mesh ref={matRef}>
      <tubeGeometry args={[curve, 64, thick, 2, false]} />
      <shaderMaterial
        transparent
        depthTest={false}
        depthWrite={false}
        // wireframe={true}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        uniforms={{
          uTime: { value: 0 },
          color: { value: new THREE.Color(materialColor) },
          color2: { value: new THREE.Color(materialColor2) },
        }}
        fragmentShader={fragment}
        vertexShader={vertex}
      />
    </mesh>
  );
};

const CurveToMesh = ({
  data,
  materialColor,
  materialColor2,
  thick,
  vertex,
  fragment,
  pulsingSpeed,
}) => {
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
        <Tube
          pulsingSpeed={pulsingSpeed}
          key={index}
          thick={thick}
          curve={curveTemp}
          materialColor={materialColor}
          materialColor2={materialColor2}
          fragment={fragment}
          vertex={vertex}
        />
      ))}
    </>
  );
};

export default CurveToMesh;
