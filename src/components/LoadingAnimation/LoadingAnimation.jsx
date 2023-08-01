import { useRef } from "react";
import "./LoadingAnimation.css";
import seamless from "/imgs/seamless2.jpg";
import { gsap, Linear } from "gsap";

const LoadingAnimation = () => {
  const divRef = useRef();
  const pos = useRef();

  const animate = () => {
    gsap.to(pos, {
      current: 100,
      onUpdate: () => {
        divRef.current.style.transform = `translateY(-${pos.current}%)`;
        console.log(pos.current);
      },
      duration: 5, // Duration of the animation in seconds
      onComplete: () => {
        pos.current = 0;
        divRef.current.style.transform = `translateY(${pos.current}%)`;
        animate();
      },
      ease: Linear.easeNone,
    });
  };
  return (
    <>
      <div ref={divRef} className="loading-wrapper">
        <img src={seamless} alt="" className="seamless-img" />
        <img src={seamless} alt="" className="seamless-img" />
      </div>
      <button
        style={{
          top: 0,
          left: 0,
          position: "absolute",
        }}
        onClick={animate}
      >
        Go
      </button>
    </>
  );
};

export default LoadingAnimation;
