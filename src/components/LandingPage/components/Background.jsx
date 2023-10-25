import { Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import { BackSide } from "three";
import { degToRad, radToDeg } from "three/src/math/MathUtils";

const Background = () => {
  return (
    <>
      <Sphere scale={[100, 100, 100]} rotation={[0, 0, degToRad(-90)]}>
        <LayerMaterial lighting="physical" transmission={1} side={BackSide}>
          <Gradient colorA={"#7ba3b1"} colorB={"black"} start={1} end={-0.45} />
        </LayerMaterial>
      </Sphere>
    </>
  );
};

export default Background;
