import { useEffect, useRef, useState } from "react";
import HeaderAnim from "../HeaderAnim/HearderAnim";
import { useImperativeHandle, forwardRef } from "react";

import "./AboutMe.scss";
import ExploreButton from "../ExploreButton/ExploreButton";
import Contact from "./Contact/Contact";

const AboutMe = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const headerAnimRef = useRef();
  const paraRef = useRef();
  const contactRef = useRef();
  const contactLinksRef = useRef();

  useImperativeHandle(ref, () => ({
    setIsVisible,
    disappear,
  }));

  const hrRef = useRef();

  const disappear = () => {
    if (isVisible) {
      hrRef.current.style.width = "0";
      headerAnimRef.current.handleExit();

      contactLinksRef.current.setIsVisible(false);

      contactRef.current.disappear();

      // PARAS

      const paras = document.querySelectorAll(".para-text");

      let i = paras.length - 1;

      console.log(paras.length);

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
      }, 100);
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
        }, 150);

        contactRef.current.appear();
      }, 1200);
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <div className="wrapper">
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
            <div className="explore-cont">
              <ExploreButton
                ref={contactRef}
                text={"Contact"}
                callbackProp={() => contactLinksRef.current.toggleIsVisible()}
              />
            </div>
            <Contact
              links={[
                [
                  "filipradinovic2@gmail.com",
                  "mailto:filipradinovic2@gmail.com",
                ],
                [
                  "@radinovicfilip",
                  "https://www.instagram.com/radinovicfilip/",
                ],
              ]}
              ref={contactLinksRef}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(AboutMe);
