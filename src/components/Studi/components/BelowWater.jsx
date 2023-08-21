import ReflectiveFloor from "./ReflectiveFloor";
import { ContentSlide } from "./ContentSlide";

const BelowWater = () => {
  return (
    <>
      <ContentSlide />
      <group position={[0, 0, 0]} scale={100}>
        <ReflectiveFloor />
      </group>
      <ambientLight />
    </>
  );
};

export default BelowWater;
