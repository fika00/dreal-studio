import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  Trail,
  Cloud,
  OrbitControls,
  Sparkles,
  Stats,
  PerspectiveCamera,
  MeshReflectorMaterial,
  Environment,
} from "@react-three/drei";
import { Color, DoubleSide } from "three";
import { gsap } from "gsap";
import "./SectionBalsa.css";
import { useControls } from "leva";
import {
  ChromaticAberration,
  Depth,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState, lazy } from "react";
import { useScroll } from "@react-three/drei";
import { ScrollControls } from "@react-three/drei";
import { Outline } from "@react-three/postprocessing";

//! COMPONENTS

import WireframeWave from "./components/WireframeWave";
import BalsaOutline from "./components/BalsaOutline";
import Triangle from "./components/Triangle";
import Loading from "../Loading/Loading";
import Triangle2 from "./components/Triangle2";
import ReflectiveFloor from "./components/ReflectiveFloor";
import ContentPlane from "./components/ContentPlane";

//? CONTENT

import img0 from "/imgs/balsa/content/image0.jpg";
import img1 from "/imgs/balsa/content/image1.jpg";
import img2 from "/imgs/balsa/content/image2.jpg";
import img3 from "/imgs/balsa/content/image3.jpg";
import img4 from "/imgs/balsa/content/image4.jpg";
import img5 from "/imgs/balsa/content/image5.jpg";
import img6 from "/imgs/balsa/content/image6.jpg";

// const WireframeWave = lazy(() => import("./components/WireframeWave"));
// const Triangle = lazy(() => import("./components/Triangle"));
// const BalsaOutline = lazy(() => import("./components/BalsaOutline"));
// const Triangle2 = lazy(() => import("./components/Triangle2"));

const SectionBalsa = ({ isPhone }) => {
  const waveRef = useRef();
  const particleRef = useRef();
  const camRef = useRef();
  const bgColorRef = useRef();
  const [dist, setDist] = useState(0.45);
  const contentTriangle = useRef();
  const content1Ref = useRef();
  const content2Ref = useRef();
  const hasAppeared = useRef(false);
  const floorRef = useRef();
  // const images = [img0, img1, img2, img3, img4, img5, img6];
  const images = [img0, img1, img2];
  const meshRefs = useRef([]);
  const testRef = useRef();

  useEffect(() => {
    meshRefs.current = meshRefs.current.slice(0, images.length); // Ensure the array length matches the number of images
  }, [images]);

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };
  // const { focusDistance } = useControls({
  //   focusDistance: {
  //     min: 0,
  //     max: 0.1,
  //     value: 2,
  //     step: 0.0001,
  //   },
  // });

  const generateRandomXY = () => {
    waveRef.current.resetWave();

    const xCord = Math.floor((Math.random() * 200 - 100) / 10);
    const yCord = Math.floor((Math.random() * 200 - 200) / 4);
    particleRef.current.position.x = xCord;
    particleRef.current.position.z = yCord;

    waveRef.current.updateCords(xCord, yCord);

    particleRef.current.position.y = -9;

    handleParticleMovement();
  };
  const handleParticleMovement = () => {
    gsap.to(particleRef.current.position, {
      y: 5.5,
      duration: 5,
      ease: "power2.in",
      onUpdate: () => {
        if (particleRef.current.position.y >= 5.5) {
          waveRef.current.startWave();
        }
      },
      onComplete: () => {
        gsap.to(particleRef.current.position, {
          y: 10,
          duration: 4,
          ease: "power2.Out",

          onComplete: () => {
            setTimeout(() => {
              generateRandomXY();
            }, 3000);
          },
        });
      },
    });
  };
  const handleAnimStart = () => {
    gsap.to(camRef.current.position, {
      z: 5.5,
      duration: 5,
      ease: "power3.inOut",
    });
  };
  useEffect(() => {
    setTimeout(() => {
      generateRandomXY();
      console.log(meshRefs);
    }, 1000);
  }, []);

  const triangleElements = [];

  for (let i = 1; i < 6; i++) {
    triangleElements.push(
      <group
        key={i}
        scale={26}
        position={[0, -15, i * 19 * -1]}
        renderOrder={i}
      >
        <Triangle
          material={
            <meshBasicMaterial
              depthWrite={false}
              color={"black"}
              transparent
              opacity={0.3 - i ** 2 / 100}
              side={DoubleSide}
            />
          }
        />
      </group>
    );
  }
  useEffect(() => {
    // console.log(isPhone);
    if (!isPhone) {
      setDist(0.45);
    } else {
      setDist(0.25);
    }
  }, []);

  const scroll = useScroll();
  useFrame(() => {
    if (camRef?.current?.position?.z != null) {
      camRef.current.position.z = -scroll.offset * 5 + 5;
      // console.log(camRef.current.position.z);
      if (camRef.current.position.z < 0.3) {
        bgColorRef.current.material.color = new Color("black");
      } else {
        bgColorRef.current.material.color = new Color("white");
      }
      if (camRef.current.position.z <= 0.1) {
        if (!hasAppeared.current) {
          // content1Ref.current.handleAppear();
          // content2Ref.current.handleAppear();
          floorRef.current.handleShow();
          hasAppeared.current = true;
          meshRefs.current.forEach((el) => {
            el.ref.handleAppear();
          });
        }
      } else {
        hasAppeared.current = false;
        // content1Ref.current.handleHide();
        // content2Ref.current.handleHide();
        meshRefs.current.forEach((el) => {
          el.ref.handleHide();
        });
        floorRef.current.handleHide();
      }
    }
  });
  // DA DA

  return (
    <>
      <Suspense fallback={<Loading name={"Balsa Ratkovic"} />}>
        {/* <fog attach="fog" color="gray" near={10} far={50} /> */}
        <WireframeWave ref={waveRef} />

        {/* PARTICLE */}
        <Trail
          width={0.5} // Width of the line
          color={"black"} // Color of the line
          attenuation={(width) => width} // A function to define the width in each point along it.
          target={particleRef}
        />
        <mesh scale={0.01} position={[0, -9, 0]} ref={particleRef}>
          <sphereGeometry />
          <meshBasicMaterial color={"black"} />
        </mesh>

        <mesh scale={150} ref={bgColorRef}>
          <sphereGeometry />
          <meshBasicMaterial side={DoubleSide} color={"white"} />
        </mesh>

        {triangleElements}
        <group scale={0.3} position={[0, 0, 4.85]}>
          <group scale={[-1, 1, 1]} position={[dist, 0, 0]}>
            <BalsaOutline />
          </group>
          <group position={[-dist, 0, 0]}>
            <BalsaOutline />
          </group>
        </group>
        <Sparkles
          position={[0, 0, 3]}
          speed={0.05}
          count={300}
          scale={3}
          size={0.8}
          color={"black"}
          opacity={0.4}
        />

        <Triangle2
          isMain={true}
          img={"image0.jpg"}
          triangleScale={isPhone ? 1 : 2}
          opacity={1.0}
        />
        {images.map((element, index) => {
          meshRefs.current[index] = meshRefs.current[index] || {}; // Initialize the ref if it doesn't exist

          return (
            <group
              // ref={(mesh) => (meshRefs.current[index].ref = mesh)}
              key={`slide-${index} `}
            >
              <ContentPlane
                pos={[-2 + index * 1.5, 0, Math.random() * 2 - 4]}
                ind={index}
                ref={(mesh) => (meshRefs.current[index].ref = mesh)}
                image={element}
              />
            </group>
          );
        })}
        {/* <group position={[1, 0, -4]} rotation={[0, degToRad(-30), 0]}>
          <Triangle2
            ref={content1Ref}
            isMain={false}
            img={"image1.jpg"}
            triangleScale={0.8}
            opacity={0.0}
          />
        </group>
        <group position={[-1, 0, -4]} rotation={[0, degToRad(30), 0]}>
          <Triangle2
            ref={content2Ref}
            isMain={false}
            img={"image2.jpg"}
            triangleScale={0.8}
            opacity={0.0}
          />
        </group> */}

        <ambientLight />

        <group position={[0, 0.5, 0]}>
          <ReflectiveFloor ref={floorRef} />
        </group>

        <PerspectiveCamera
          ref={camRef}
          makeDefault
          position={[0, 0, 5]}
          fov={75}
          near={0.01}
        />
        {/* <Environment preset="dawn" /> */}

        {/* <EffectComposer>
          <ChromaticAberration
            offset={[0.0005, 0.0]} // color offset
          />
        </EffectComposer> */}
        {/* <OrbitControls /> */}
        <Stats />
      </Suspense>
    </>
  );
};

export default SectionBalsa;
