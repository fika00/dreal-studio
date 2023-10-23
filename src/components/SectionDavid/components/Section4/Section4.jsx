import ButtonDavid from "../ButtonDavid/ButtonDavid";
import HeaderDavid from "../Header/HeaderDavid";
import SubHeader from "../SubHeader/SubHeader";
import { useEffect, useRef, useState } from "react";
import "./section4.scss";
import { useImperativeHandle, forwardRef } from "react";

import ae from "/imgs/david/ae white-01.svg";
import ai from "/imgs/david/ai white-01.svg";
import pr from "/imgs/david/pr white-01.svg";
import ps from "/imgs/david/ps white-01.svg";
import FrameWorksDavid from "../FrameWorksDavid/FrameWorksDavid";

const section4 = ({ callBackProp }, ref) => {
  useImperativeHandle(ref, () => ({
    exit,
    enter,
  }));
  const headerRef = useRef();
  const subHeaderRef = useRef();
  const paraRef = useRef();
  const para1Ref = useRef();
  const para2Ref = useRef();

  const [isVisible, setIsVisible] = useState(false);

  const exit = () => {
    if (isVisible) {
      headerRef.current.handleExit();
      exitPara();
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
        console.log("POCELO");
        enterPara();
      }, 1750);
    }
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <div className="section3-container">
          <HeaderDavid text={"Graphic design"} ref={headerRef} />
          <div
            style={{
              width: "95%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div ref={paraRef} className="para-div lefty">
              <p ref={para1Ref} className="para-text left">
                I'm a graphic design specialist with three years of education in
                graphic design and multimedia.
              </p>
              <p ref={para2Ref} className="para-text left">
                My focus areas include logo design, visual identity, brand
                animations, and I'm proud to have created the Dreal Studio
                Visual Identity.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(section4);
