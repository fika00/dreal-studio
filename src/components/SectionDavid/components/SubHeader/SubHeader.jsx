import { useEffect } from "react";
import "./SubHeader.scss";
import { useImperativeHandle, forwardRef } from "react";

const HeaderDavidAnim = ({ text, small }, ref) => {
  useImperativeHandle(ref, () => ({
    handleExit,
  }));
  const words = text.split(" ");
  console.log(words);

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleExit = () => {
    const letters = document.querySelectorAll(".sub-header-text");

    let i = 0;
    const interval = setInterval(() => {
      letters[i].style.opacity = 1;
      letters[i].style.transform = "translateY(-100%)";
      letters[i].style.filter = "blur(3px)";
      i++;
      if (i == letters.length) {
        clearInterval(interval);
      }
    }, 150);
  };

  const handleEnter = () => {
    const letters = document.querySelectorAll(".sub-header-text");
    let i = 0;
    const interval = setInterval(() => {
      letters[i].style.opacity = 1;
      letters[i].style.transform = "translateY(0)";
      letters[i].style.filter = "blur(0)";
      i++;
      if (i == letters.length) {
        clearInterval(interval);
      }
    }, 150);
  };

  useEffect(() => {
    setTimeout(() => {
      // handleExit();
      handleEnter();
      console.log("Entered");
    }, 2000);
  }, []);

  return (
    <>
      <div className="sub-header-cont">
        {words.map((word, index) => (
          <div className="sub-header-each-word" key={index}>
            <span className="sub-header-text">{word}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default forwardRef(HeaderDavidAnim);
