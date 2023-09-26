import "./HeroContainer.scss";
import ButtonDreal from "../ButtonDreal/ButtonDreal";
import HeroTextAnim from "../HeroTextAnim";
import { useRef } from "react";
import Icon from "../Icon/Icon";

import userIcon from "/imgs/filip/user-icon.svg";
import jobIcon from "/imgs/filip/job-icon.svg";

const HeroContainer = ({ onCallback }) => {
  const nameRef = useRef();
  const hrRef = useRef();
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
    }, 300);
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
      }, 2000);
    }, 100);
  };

  return (
    <>
      <div className="hero-container">
        <div className="upper-part">
          <HeroTextAnim ref={nameRef} text={"FILIP"} />
          <div className="upper-icons">
            <div
              onClick={() => onCallback(1)}
              ref={iconRef3}
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
              onClick={() => onCallback(2)}
              ref={iconRef1}
              className="icon-bottom"
            >
              <Icon art={userIcon} />
            </div>

            <div
              onClick={() => onCallback(3)}
              ref={iconRef2}
              className="icon-bottom"
            >
              <Icon art={jobIcon} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroContainer;
