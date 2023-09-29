import { useEffect } from "react";
import "./HeaderAnim.scss";
import { useImperativeHandle, forwardRef } from "react";

const HeaderAnim = ({ text }, ref) => {
  useImperativeHandle(ref, () => ({
    handleExit,
  }));
  const letters = text.split("");
  console.log(letters);

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleExit = () => {
    const letters = document.querySelectorAll(".each-letter-header");

    letters.forEach((letter) => {
      letter.style.opacity = 0;
      letter.style.transform = `translateX(${getRandomNumberInRange(
        -50,
        50
      )}%)`;
    });
  };

  const handleEnter = () => {
    const letters = document.querySelectorAll(".each-letter-header");

    letters.forEach((letter) => {
      letter.style.opacity = 1;
      letter.style.transform = "translateX(0)";
    });
  };

  useEffect(() => {
    setTimeout(() => {
      handleEnter();
      console.log("Entered");
    }, 750);
  }, []);

  return (
    <>
      <div className="wrapper-header-anim">
        {letters.map((letter, index) => (
          <div key={index} className="letter-cont">
            <span
              style={{
                opacity: 0,
                transform: `translateX(${getRandomNumberInRange(-50, 50)}%)`,
              }}
              className="each-letter-header"
            >
              {letter}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default forwardRef(HeaderAnim);
