import { useRef } from "react";
import "./ExploreButton.scss";
import { useEffect } from "react";
import { forwardRef, useImperativeHandle } from "react";

const ExploreButton = ({ text }, ref) => {
  useImperativeHandle(ref, () => ({
    appear,
    disappear,
  }));
  const letters = text.split("");
  const exploreHrRef = useRef();

  const appear = () => {
    const exploreLetters = document.querySelectorAll(".each-explore-letter");
    let i = 0;
    exploreHrRef.current.style.alignSelf = "flex-start";
    exploreHrRef.current.style.transition = "1.5s ease";

    const interval = setInterval(() => {
      exploreLetters[i].style.transform = "translateY(0)";
      i++;
      if (i == exploreLetters.length) {
        clearInterval(interval);
      }
    }, 100);
    setTimeout(() => {
      exploreHrRef.current.style.width = "100%";
    }, 50);
  };

  const disappear = () => {
    const exploreLetters = document.querySelectorAll(".each-explore-letter");
    exploreHrRef.current.style.alignSelf = "flex-end";
    exploreHrRef.current.style.transition = "1s ease";

    let i = 0;

    const interval = setInterval(() => {
      exploreLetters[i].style.transform = "translateY(100%)";
      i++;
      if (i == exploreLetters.length) {
        clearInterval(interval);
      }
    }, 50);
    setTimeout(() => {
      exploreHrRef.current.style.width = "0";
    }, 300);
  };

  return (
    <div className="explore-container">
      <div className="explore-wrap">
        {letters.map((letter, index) => (
          <div className="each-explore-letter" key={index}>
            <span className="explore-text">{letter}</span>
          </div>
        ))}
      </div>
      <hr ref={exploreHrRef} className="under-explore" />
    </div>
  );
};

export default forwardRef(ExploreButton);
