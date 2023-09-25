import { useEffect } from "react";
import "./HeroTextAnim.scss";
import { useImperativeHandle, forwardRef } from "react";

const HeroTextAnim = ({ text }, ref) => {
  useImperativeHandle(ref, () => ({
    animate,
    animateOut,
  }));

  const letters = text.split("");
  console.log(letters);

  const animate = () => {
    const letterArray = document.querySelectorAll(".each-letter");

    let i = 0;

    const interval = setInterval(() => {
      letterArray[i].style.filter = "blur(0px)";
      i++;
      if (i == letterArray.length) {
        clearInterval(interval);
      }
    }, 100);
  };

  const animateOut = () => {
    const letterArray = document.querySelectorAll(".each-letter");

    let i = 0;

    const interval = setInterval(() => {
      letterArray[i].style.transform = "translateY(120%)";
      i++;
      if (i == letterArray.length) {
        clearInterval(interval);
      }
    }, 40);
  };

  useEffect(() => {
    setTimeout(() => {
      animate();
    }, 2000);
  }, []);

  return (
    <div className="word">
      {letters.map((letter, index) => {
        return (
          <span key={index} className="each-letter">
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default forwardRef(HeroTextAnim);
