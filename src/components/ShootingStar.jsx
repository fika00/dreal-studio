import { useRef, useState, useEffect } from "react";
import { Trail } from "@react-three/drei";
import { gsap } from "gsap";
const ShootingStar = () => {
  const shootingStarRef = useRef();
  const [isTrailEnabled, setTrailEnabled] = useState(true);
  const trailRef = useRef();
  const [intro, setIntro] = useState(true);
  const [isMoving, setisMoving] = useState(true);
  useEffect(() => {
    console.log("ALO");
    let delay = Math.floor(Math.random() * 3000) + 7000;

    function generatePosition() {
      let x = Math.floor(Math.random() * 20) - 10;
      let y = Math.floor(Math.random() * 4);
      let z = Math.floor(Math.random() * 3) - 9;

      return [x, y, z];
    }

    if (!isMoving && !intro) {
      setisMoving(true);

      const startPoint = generatePosition();
      const endPoint = generatePosition();

      console.log(startPoint, endPoint);

      shootingStarRef.current.position.x = startPoint[0];
      shootingStarRef.current.position.y = startPoint[1];
      shootingStarRef.current.position.z = startPoint[2];

      // shootingStarRef.current.position.x = -20;
      // shootingStarRef.current.position.y = 0;
      setTrailEnabled(true);
      gsap.to(shootingStarRef.current.position, {
        x: endPoint[0],
        y: endPoint[1],
        z: endPoint[2],
        duration: 2,
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            setTrailEnabled(false);

            setisMoving(false);
          }, delay);
        },
      });
    }
  }, [isMoving]);
  useEffect(() => {
    setTimeout(() => {
      if (intro) {
        gsap.to(shootingStarRef.current.position, {
          x: 7,
          y: 1,

          duration: 2, // Duration of the animation in seconds
          ease: "power3.InOut",
          onComplete: () => {
            setTimeout(() => {
              setIntro(false);
              setTrailEnabled(false);

              setisMoving(false);
            }, 3000);
          },
        });
      }
    }, 2500);
  });
  return (
    <>
      <mesh ref={shootingStarRef} scale={0.1} position={[-7, 6, -9]}>
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color={"black"} toneMapped={false} />
      </mesh>
      {isTrailEnabled && (
        <Trail
          ref={trailRef}
          target={shootingStarRef}
          width={1}
          length={8}
          color={"hotpink"}
          attenuation={(t) => t * t}
        ></Trail>
      )}
    </>
  );
};
export default ShootingStar;
