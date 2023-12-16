import { useEffect, useRef, useState } from "react";
import HeaderAnim from "../HeaderAnim/HearderAnim";
import { useImperativeHandle, forwardRef } from "react";

import "./Work.scss";
import FrameWorks from "../FrameWorks/FrameWorks";

import threejs from "/imgs/filip/threejs-icon.svg";
import react from "/imgs/filip/react-icon.svg";
import nextjs from "/imgs/filip/nextjs-icon.svg";
import unity from "/imgs/filip/unity-icon.svg";
import python from "/imgs/filip/python-icon.svg";
import Projects from "../Projects/Projects";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ButtonDreal from "../ButtonDreal/ButtonDreal";

const Work = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const headerAnimRef = useRef();
  const frameWorksRef = useRef();
  const projectsRef = useRef();
  const videoPlayerRef = useRef();

  const paraRef = useRef();
  useImperativeHandle(ref, () => ({
    setIsVisible,
    disappear,
  }));

  const hrRef = useRef();

  const disappear = () => {
    if (isVisible) {
      // if (!props.isPhone) {
      //   projectsRef.current.disappear();
      // }
      hrRef.current.style.width = "0";
      headerAnimRef.current.handleExit();

      frameWorksRef.current.exit();

      // PARAS

      if (!isPlayerVisible) {
        const paras = document.querySelectorAll(".para-text");

        let i = paras.length - 1;

        const inteval = setInterval(() => {
          paras[i].style.transform = "translateY(30px)";
          paras[i].style.opacity = 0;
          i--;
          if (i < 0) {
            clearInterval(inteval);
          }
        }, 150);
      }

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
      }, 100);
      setTimeout(() => {
        if (!isPlayerVisible) {
          const paras = document.querySelectorAll(".para-text");

          let i = 0;

          const inteval = setInterval(() => {
            paras[i].style.transform = "translateY(0)";
            paras[i].style.opacity = 1;
            i++;
            if (i == paras.length) {
              clearInterval(inteval);
            }
          }, 150);
        }
      }, 1200);
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <>
          <div className="wrapper">
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
                  <VideoPlayer ref={videoPlayerRef} isPhone={props.isPhone} />
                </div>
              </div>
              <FrameWorks
                ref={frameWorksRef}
                frameworks={[
                  [nextjs, "NextJs"],
                  [react, "React"],
                  [threejs, "ThreeJs"],
                  [unity, "Unity"],
                  [python, "Python"],
                ]}
              />

              <ButtonDreal
                text={"See more"}
                noHide={true}
                onClick={() => {
                  videoPlayerRef.current.toggleVisibility();
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default forwardRef(Work);
