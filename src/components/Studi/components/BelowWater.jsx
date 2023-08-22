import ReflectiveFloor from "./ReflectiveFloor";
import { ContentSlide } from "./ContentSlide";
import { DoubleSide } from "three";

const BelowWater = () => {
  return (
    <>
      <fog attach="fog" args={["#000000", 90, 500]} />

      <ContentSlide />

      <group position={[0, 0, 0]} scale={100}>
        <ReflectiveFloor />
      </group>

      <ambientLight />
    </>
  );
};

export default BelowWater;
