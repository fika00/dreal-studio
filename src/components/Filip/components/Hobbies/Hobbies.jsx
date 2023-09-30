import { useEffect, useRef, useState } from "react";
import HeaderAnim from "../HeaderAnim/HearderAnim";
import { useImperativeHandle, forwardRef } from "react";

import "./Hobbies.scss";
import ExploreButton from "../ExploreButton/ExploreButton";

const AboutMe = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const headerAnimRef = useRef();
  const paraRef = useRef();
  const exploreButtonRef = useRef();

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
      exploreButtonRef.current.disappear();
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        hrRef.current.style.width = "90%";
        setTimeout(() => {
          exploreButtonRef.current.appear();
        }, 1300);
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
            <HeaderAnim small ref={headerAnimRef} text={"HOBBIES"} />
            <hr ref={hrRef} className="about-me-divider" />
            <div ref={paraRef} className="para-div">
              <p className="para-text">
                Passionate about video editing, photo manipulation, music
                production, and web experiences, I craft captivating multimedia
                adventures. Join me on a journey through the realms of
                creativity
              </p>
              <p className="para-text">Explore some of my work.</p>
            </div>
          </div>
          <ExploreButton ref={exploreButtonRef} text={"Explore"} />
        </div>
      )}
    </>
  );
};

export default forwardRef(AboutMe);
