import "./HeroContainer.scss";
import ButtonDreal from "../ButtonDreal/ButtonDreal";
import HeroTextAnim from "../HeroTextAnim";
import { useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { forwardRef, useImperativeHandle } from "react";

import userIcon from "/imgs/filip/user-icon.svg";
import jobIcon from "/imgs/filip/job-icon.svg";
import puzzleIcon from "/imgs/filip/puzzle.svg";

const HeroContainer = ({ onCallback }, ref) => {
  useImperativeHandle(ref, () => ({
    setIsVisible,
  }));
  const nameRef = useRef();
  const hrRef = useRef();
  const [isVisible, setIsVisible] = useState(true);
  const [sectionPickerOpen, setSectionPickerOpen] = useState(false);

  const iconRef1 = useRef();
  const iconRef2 = useRef();
  const iconRef3 = useRef();

  const revealPicks = () => {
    const icons = [iconRef1, iconRef2, iconRef3];
    let i = 0;

    const interval = setInterval(() => {
      icons[i].current.style.transform = "translateY(0)";
      i++;
      if (i == icons.length) {
        clearInterval(interval);
      }
    }, 100);
  };

  const hidePicker = () => {
    const icons = [iconRef1, iconRef2, iconRef3];
    let i = 0;
    hrRef.current.style.width = "250px";

    const interval = setInterval(() => {
      if (i == 1) {
        icons[i].current.style.transform = "translateY(110%)";
      } else {
        icons[i].current.style.transform = "translateY(-120%)";
      }
      i++;

      if (i == icons.length) {
        clearInterval(interval);
      }
    }, 150);
    setTimeout(() => {
      hrRef.current.style.width = "0";
    }, 1450);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const showPicker = () => {
    hrRef.current.style.width = "300px";
    setTimeout(() => {
      nameRef.current.animateOut();
      setTimeout(() => {
        revealPicks();
      }, 400);
      setTimeout(() => {
        hrRef.current.style.width = "0";
      }, 1450);
    }, 100);
  };

  return (
    <>
      {isVisible && (
        <div className="hero-container">
          <div className="upper-part">
            <HeroTextAnim ref={nameRef} text={"FILIP"} />
            <div className="upper-icons">
              <div
                onClick={() => {
                  hidePicker();
                  onCallback(1);
                }}
                ref={iconRef2}
                className="icon-top"
              >
                <Icon art={userIcon} />
              </div>
            </div>
          </div>

          <hr ref={hrRef} className="hr-divider" />

          <div className="under-hr">
            <ButtonDreal text={"Meet me"} onClick={() => showPicker()} />

            <div className="lower-icons">
              <div
                onClick={() => {
                  hidePicker();
                  onCallback(2);
                }}
                ref={iconRef1}
                className="icon-bottom"
              >
                <Icon art={puzzleIcon} />
              </div>

              <div
                onClick={() => {
                  hidePicker();
                  onCallback(3);
                }}
                ref={iconRef3}
                className="icon-bottom"
              >
                <Icon art={jobIcon} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(HeroContainer);
