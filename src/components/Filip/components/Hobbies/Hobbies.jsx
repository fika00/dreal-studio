import { useEffect, useRef, useState } from "react";
import HeaderAnim from "../HeaderAnim/HearderAnim";
import { useImperativeHandle, forwardRef } from "react";

import "./Hobbies.scss";
import ExploreButton from "../ExploreButton/ExploreButton";
import premiere_icon from "/imgs/filip/hobbies/premiere-icon.svg";
import photoshop_icon from "/imgs/filip/hobbies/photoshop-icon.svg";
import blender_icon from "/imgs/filip/hobbies/blender-icon.svg";
import aftereffects_icon from "/imgs/filip/hobbies/aftereffects-icon.svg";
import FrameWorks from "../FrameWorks/FrameWorks";

const AboutMe = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const headerAnimRef = useRef();
  const paraRef = useRef();
  const exploreButtonRef = useRef();
  const frameworksRef = useRef();

  useImperativeHandle(ref, () => ({
    setIsVisible,
    disappear,
  }));

  const hrRef = useRef();

  const disappear = () => {
    if (isVisible) {
      hrRef.current.style.width = "0";
      headerAnimRef.current.handleExit();

      exploreButtonRef.current.disappear();

      // PARAS

      const paras = document.querySelectorAll(".para-text");

      let i = paras.length - 1;

      frameworksRef.current.exit();

      const inteval = setInterval(() => {
        paras[i].style.transform = "translateY(30px)";
        paras[i].style.opacity = 0;
        i--;
        if (i < 0) {
          clearInterval(inteval);
        }
      }, 150);

      // PARAS

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
      }, 150);
      setTimeout(() => {
        const paras = document.querySelectorAll(".para-text");

        let i = 0;

        const inteval = setInterval(() => {
          paras[i].style.transform = "translateY(0)";
          paras[i].style.opacity = 1;
          i++;
          if (i == paras.length) {
            clearInterval(inteval);
          }
        }, 100);
      }, 1200);
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <div className="wrapper">
          <div className="about-me-container">
            <div className="about-me-header">
              <HeaderAnim small ref={headerAnimRef} text={"HOBBIES"} />
              <hr ref={hrRef} className="about-me-divider" />
              <div ref={paraRef} className="para-div">
                <p className="para-text">
                  Passionate about video editing, photo manipulation, music
                  production, and web experiences, I craft captivating
                  multimedia adventures. Join me on a journey through the realms
                  of creativity
                </p>
                <p className="para-text">Explore some of my work.</p>
              </div>
            </div>
            <FrameWorks
              frameworks={[
                [aftereffects_icon, "After Effects"],
                [photoshop_icon, "Photoshop"],
                [premiere_icon, "Premiere"],
                [blender_icon, "Blender"],
              ]}
              ref={frameworksRef}
            />
            <div className="explore-cont">
              <ExploreButton
                ref={exploreButtonRef}
                text={"Explore"}
                red
                callbackProp={props.onCallback}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(AboutMe);
