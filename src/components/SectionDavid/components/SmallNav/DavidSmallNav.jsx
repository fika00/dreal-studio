import arrow from "/imgs/david/nav-icon.svg";
import "./DavidSmallNav.scss";
import { useState, useRef, useEffect } from "react";
import { useImperativeHandle, forwardRef } from "react";

const DavidSmallNav = ({ navCallback }, ref) => {
  useImperativeHandle(ref, () => ({
    setCurrentPos,
  }));
  const [currentPos, setCurrentPos] = useState(0);
  const leftRef = useRef();
  const rightRef = useRef();

  const changePos = (dir) => {
    if (currentPos + dir >= 0 && currentPos + dir <= 3) {
      navCallback(currentPos + dir);
    }
  };
  useEffect(() => {
    if (currentPos == 0) {
      leftRef.current.style.opacity = 0.25;
      leftRef.current.style.cursor = "unset";
    } else if (currentPos == 3) {
      rightRef.current.style.opacity = 0.25;
      rightRef.current.style.cursor = "unset";
    } else {
      rightRef.current.style.opacity = 1;
      leftRef.current.style.opacity = 1;
      leftRef.current.style.cursor = "pointer";
      rightRef.current.style.cursor = "pointer";
    }
  });
  return (
    <div className="david-small-nav">
      <img
        src={arrow}
        alt=""
        className="arrow left"
        ref={leftRef}
        onClick={() => changePos(-1)}
      />
      <img
        src={arrow}
        alt=""
        className="arrow"
        ref={rightRef}
        onClick={() => changePos(1)}
      />
    </div>
  );
};

export default forwardRef(DavidSmallNav);
