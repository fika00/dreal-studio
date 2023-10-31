import Icon from "../Icon/Icon";
import userIcon from "/imgs/filip/user-icon.svg";
import jobIcon from "/imgs/filip/job-icon.svg";
import puzzleIcon from "/imgs/filip/puzzle.svg";

import "./SmallNav.scss";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";

const SmallNav = ({ onClickCallback, isPhone }, ref) => {
  useImperativeHandle(ref, () => ({
    setIsVisible,
    hideSmallNav,
    setIsNavigatable,
  }));
  const [isVisible, setIsVisible] = useState(false);
  const [isNavigatable, setIsNavigatable] = useState(true);
  const backToTopRef = useRef();

  const showSmallNav = () => {
    const sectionIcons = document.querySelectorAll(".icon-section");
    setTimeout(() => {
      backToTopRef.current.style.transform = "scale(1)";
    }, 1500);
    let i = 0;
    const interval = setInterval(() => {
      sectionIcons[i].style.transform = "translateX(0)";

      i++;
      if (i == sectionIcons.length) {
        clearInterval(interval);
      }
    }, 150);
  };
  const hideSmallNav = () => {
    const sectionIcons = document.querySelectorAll(".icon-section");
    backToTopRef.current.style.transform = "scale(0)";

    let i = 0;
    const interval = setInterval(() => {
      if (isPhone) {
        sectionIcons[i].style.transform = "translateX(75px)";
      } else {
        sectionIcons[i].style.transform = "translateX(-75px)";
      }
      i++;
      if (i == sectionIcons.length) {
        clearInterval(interval);
      }
    }, 150);
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  const navigate = (dir) => {
    if (isNavigatable) {
      onClickCallback(dir);
      setIsNavigatable(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      showSmallNav();
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div className="small-nav-container">
          <div
            onClick={() => navigate(0)}
            className="back-to-top"
            ref={backToTopRef}
          ></div>
          <div
            onClick={() => navigate(1)}
            className={`icon-section ${!isPhone ? "is-Pc" : ""}`}
          >
            <Icon art={userIcon} isSmall />
          </div>
          <div
            onClick={() => navigate(2)}
            className={`icon-section ${!isPhone ? `is-Pc` : ``}`}
          >
            <Icon art={puzzleIcon} isSmall />
          </div>
          <div
            onClick={() => navigate(3)}
            className={`icon-section ${!isPhone ? `is-Pc` : ``}`}
          >
            <Icon art={jobIcon} isSmall />
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(SmallNav);
