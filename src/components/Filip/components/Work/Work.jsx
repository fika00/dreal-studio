import { useEffect, useRef, useState } from "react";
import HeaderAnim from "../HeaderAnim/HearderAnim";
import { useImperativeHandle, forwardRef } from "react";

import "./Work.scss";
import FrameWorks from "../FrameWorks/FrameWorks";

import threejs from "/imgs/filip/threejs-icon.svg";
import react from "/imgs/filip/react-icon.svg";
import nextjs from "/imgs/filip/nextjs-icon.svg";
import unity from "/imgs/filip/unity-icon.svg";

const Work = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const headerAnimRef = useRef();
  const frameWorksRef = useRef();

  const paraRef = useRef();
  useImperativeHandle(ref, () => ({
    setIsVisible,
    disappear,
  }));

  const hrRef = useRef();

  const disappear = () => {
    if (isVisible) {
      hrRef.current.style.width = "0";
      headerAnimRef.current.handleExit();
      paraRef.current.style.transform = "translateY(30px)";
      paraRef.current.style.opacity = 0;
      frameWorksRef.current.exit();
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        hrRef.current.style.width = "90%";
      }, 100);
      setTimeout(() => {
        paraRef.current.style.transform = "translateY(0)";
        paraRef.current.style.opacity = 1;
      }, 1200);
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <div className="about-me-container">
          <div className="about-me-header">
            <HeaderAnim ref={headerAnimRef} text={"WORK"} />
            <hr ref={hrRef} className="about-me-divider" />
            <div ref={paraRef} className="para-div">
              <p className="para-text">
                From web development and game design to machine learning, my
                career has been a dynamic fusion of innovation and creation.
                Join me as I navigate the evolving tech landscape.
              </p>
              <p className="para-text">
                Crafting visual wonders, one pixel at a time.
              </p>
            </div>
          </div>
          {/* <div className="next-button-container">
            <div className="next-button-wrap">
              <span className="next-button-text">Explore</span>
              <hr className="under-explore" />
            </div>
          </div> */}
          <FrameWorks
            ref={frameWorksRef}
            frameworks={[nextjs, react, threejs, unity]}
          />
        </div>
      )}
    </>
  );
};

export default forwardRef(Work);
