import ButtonDavid from "../ButtonDavid/ButtonDavid";
import HeaderDavid from "../Header/HeaderDavid";
import SubHeader from "../SubHeader/SubHeader";
import { useEffect, useRef, useState } from "react";
import "./Section2.scss";
import { useImperativeHandle, forwardRef } from "react";

import ae from "/imgs/david/ae white-01.svg";
import ai from "/imgs/david/ai white-01.svg";
import pr from "/imgs/david/pr white-01.svg";
import ps from "/imgs/david/ps white-01.svg";
import FrameWorksDavid from "../FrameWorksDavid/FrameWorksDavid";

const Section2 = ({ callBackProp }, ref) => {
  useImperativeHandle(ref, () => ({
    exit,
    enter,
  }));
  const headerRef = useRef();
  const subHeaderRef = useRef();
  const paraRef = useRef();
  const para1Ref = useRef();
  const para2Ref = useRef();
  const frameworksRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const exit = () => {
    if (isVisible) {
      exitPara();
      headerRef.current.handleExit();
      frameworksRef.current.exit();
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }
  };
  const enter = () => {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  };
  const enterPara = () => {
    const paras = [para1Ref, para2Ref];

    let i = 0;
    const interval = setInterval(() => {
      paras[i].current.style.transform = "translateY(0)";
      paras[i].current.style.opacity = 1;
      i++;

      if (i == paras.length) {
        clearInterval(interval);
      }
    }, 100);
  };

  const exitPara = () => {
    const paras = [para1Ref, para2Ref];

    let i = 0;
    const interval = setInterval(() => {
      paras[i].current.style.transform = "translateY(20%)";
      paras[i].current.style.opacity = 0;

      i++;

      if (i >= paras.length) {
        clearInterval(interval);
      }
    }, 100);
  };
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        enterPara();
      }, 1750);
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <div className="section2-container">
          <HeaderDavid text={"About me"} ref={headerRef} />
          <div
            style={{
              width: "95%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div ref={paraRef} className="para-div">
              <p className="para-text" ref={para1Ref}>
                I am a versatile creative individual with expertise in graphic
                design, comic animation, multimedia animation, and video
                editing.
              </p>
              <p className="para-text" ref={para2Ref}>
                My skill set encompasses a wide range of multimedia disciplines,
                making me a one-stop solution for your creative needs
              </p>
            </div>
          </div>
          <FrameWorksDavid ref={frameworksRef} frameworks={[ae, ai, ps, pr]} />
        </div>
      )}
    </>
  );
};

export default forwardRef(Section2);
