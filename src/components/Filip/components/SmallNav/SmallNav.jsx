import Icon from "../Icon/Icon";
import userIcon from "/imgs/filip/user-icon.svg";
import jobIcon from "/imgs/filip/job-icon.svg";
import puzzleIcon from "/imgs/filip/puzzle.svg";

import "./SmallNav.scss";
import { useEffect } from "react";
import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";

const SmallNav = ({ onClickCallback }, ref) => {
  useImperativeHandle(ref, () => ({
    setIsVisible,
    hideSmallNav,
  }));
  const [isVisible, setIsVisible] = useState(false);

  const showSmallNav = () => {
    const sectionIcons = document.querySelectorAll(".icon-section");
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
    let i = 0;
    const interval = setInterval(() => {
      sectionIcons[i].style.transform = "translateX(75px)";
      i++;
      if (i == sectionIcons.length) {
        clearInterval(interval);
      }
    }, 150);
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
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
          <div onClick={() => onClickCallback(0)} className="back-to-top"></div>
          <div onClick={() => onClickCallback(1)} className="icon-section">
            <Icon art={userIcon} isSmall />
          </div>
          <div onClick={() => onClickCallback(2)} className="icon-section">
            <Icon art={puzzleIcon} isSmall />
          </div>
          <div onClick={() => onClickCallback(3)} className="icon-section">
            <Icon art={jobIcon} isSmall />
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(SmallNav);