import { useEffect, useRef, useState } from "react";
import HeaderAnim from "../HeaderAnim/HearderAnim";
import { useImperativeHandle, forwardRef } from "react";

import "./AboutMe.scss";

const AboutMe = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const headerAnimRef = useRef();
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
            <HeaderAnim ref={headerAnimRef} text={"ABOUT ME"} />
            <hr ref={hrRef} className="about-me-divider" />
            <div ref={paraRef} className="para-div">
              <p className="para-text">
                Montenegro-born, economics and programming enthusiast with a
                deep love for the art of video and photo editing.
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
        </div>
      )}
    </>
  );
};

export default forwardRef(AboutMe);
