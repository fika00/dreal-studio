import { MeshReflectorMaterial } from "@react-three/drei";
import { useState } from "react";
import { useImperativeHandle, forwardRef } from "react";
import { RepeatWrapping } from "three";
import { TextureLoader } from "three";

const ReflectiveFloor = (props, ref) => {
  useImperativeHandle(ref, () => ({
    handleShow,
    handleHide,
  }));

  const loader = new TextureLoader();
  const displacementMap = loader.load(
    "/imgs/studi/Water_1_M_Normal.jpg",
    (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    }
  );

  const degToRad = (deg) => {
    return deg * 0.0174533;
  };
  const [isVisible, setIsVisible] = useState(true);

  const handleShow = () => {
    setIsVisible(true);
  };
  const handleHide = () => {
    setIsVisible(false);
  };
  return (
    <>
      <mesh scale={10} rotation={[degToRad(-90), 0, 0]}>
        <planeGeometry />
        <MeshReflectorMaterial
          // color="white"
          blur={[500, 250]}
          resolution={2048}
          mixBlur={10}
          mixStrength={55}
          metalness={0.99}
          roughness={0.01}
          mirror={0}
          // normalMap={displacementMap}
          // normalScale={60}

          // opacity={isVisible ? 1 : 0}
          // depthWrite={false}
          // transparent
        />
      </mesh>
    </>
  );
};

export default forwardRef(ReflectiveFloor);
