import { TextureLoader } from "three";
import contentPlaneFragment from "./shaders/contentPlaneFragment.glsl";
import contentPlaneVertex from "./shaders/contentPlaneVertex.glsl";
import {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

const ContentPlane = (props, ref) => {
  useImperativeHandle(ref, () => ({
    handleAppear,
    handleHide,
  }));

  const loader = new TextureLoader();
  const [ratio, setRatio] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const planeRef = useRef();
  const flickerDur = Math.random() / 12;
  const durDur = Math.random() * 500 + 500;

  const contentImg = loader.load(props.image, () => {
    let dimRatio = contentImg.image.width / contentImg.image.height;
    if (dimRatio >= 1) {
      if (ratio.length < 1) {
        setRatio([dimRatio, 1]);
      }
    } else {
      if (ratio.length < 1) {
        setRatio([1, contentImg.image.height / contentImg.image.width]);
      }
    }
  });
  //   contentImg.encoding = THREE.sRGBEncoding

  const handleAppear = () => {
    console.log(flickerDur);
    const animation = gsap.to(planeRef.current.material, {
      duration: flickerDur,
      opacity: 1,
      repeat: -1, // Infinite repeat
      yoyo: true, // Reverse the animation
      ease: "power1.inOut", // Easing function
    });
    setTimeout(() => {
      animation.kill();
      planeRef.current.material.opacity = 1;
      planeRef.current.material.depthWrite = true;
    }, durDur);
  };
  const handleHide = () => {
    planeRef.current.material.opacity = 0;
    planeRef.current.material.depthWrite = false;
  };
  //   useEffect(() => {
  //     setTimeout(() => {
  //       handleAppear();
  //     }, 3000);
  //   }, []);
  useFrame(() => {
    if (planeRef.current.position.x >= -5.15) {
      planeRef.current.position.x -= 0.005;
    } else {
      planeRef.current.position.x = 5.15;
    }
  });
  return (
    <>
      <group>
        <mesh ref={planeRef} position={props.pos}>
          <planeGeometry args={ratio} />
          <meshBasicMaterial
            depthWrite={false}
            map={contentImg}
            toneMapped={false}
            opacity={0.0}
            transparent
          />
          {/* <shaderMaterial
            fragmentShader={contentPlaneFragment}
            vertexShader={contentPlaneVertex}
            transparent
            uniforms={{
              uTime: { value: 0 },
              image: { value: contentImg },
            }}
          /> */}
        </mesh>
      </group>
    </>
  );
};

export default forwardRef(ContentPlane);
