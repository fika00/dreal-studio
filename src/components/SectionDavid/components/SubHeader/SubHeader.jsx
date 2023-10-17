import { useEffect } from "react";
import "./SubHeader.scss";
import { useImperativeHandle, forwardRef } from "react";

const HeaderDavidAnim = ({ text, small }, ref) => {
  const words = text.split(" ");
  console.log(words);

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleExit = () => {
    const letters = document.querySelectorAll(".sub-header-each-word");

    letters.forEach((letter) => {
      letter.style.opacity = 0;
      letter.style.transform = `translateY(-100%)`;
      letter.style.filter = "blur(10px)";
    });
  };

  const handleEnter = () => {
    const letters = document.querySelectorAll(".sub-header-each-word");

    letters.forEach((letter) => {
      letter.style.opacity = 1;
      letter.style.transform = "translateY(0)";
      letter.style.filter = "blur(0)";
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
      <div className="sub-header-cont">
        {words.map((word, index) => (
          <div className="sub-header-each-word" key={index}>
            {word}
          </div>
        ))}
      </div>
    </>
  );
};

export default forwardRef(HeaderDavidAnim);
