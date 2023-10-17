import { useEffect } from "react";
import "./HeaderDavid.scss";
import { useImperativeHandle, forwardRef } from "react";

const HeaderDavidAnim = ({ text, small }, ref) => {
  const words = text.split(" ");
  console.log(words);

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleExit = () => {
    const letters = document.querySelectorAll(".each-letter-header-david");

    letters.forEach((letter) => {
      letter.style.opacity = 0;
      letter.style.transform = `translateX(${getRandomNumberInRange(
        -50,
        50
      )}%)`;
      letter.style.filter = "blur(10px)";
    });
  };

  const handleEnter = () => {
    const letters = document.querySelectorAll(".each-letter-header-david");

    letters.forEach((letter) => {
      letter.style.opacity = 1;
      letter.style.transform = "translateX(0)";
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
      <div className="wrapper-header-david-anim">
        {words.map((word, index) => (
          <div className="each-word" key={index}>
            {word.split("").map((letter, index) => (
              <div key={index} className="letter-cont-david">
                <span
                  style={{
                    opacity: 0,
                    transform: `translateX(${getRandomNumberInRange(
                      -50,
                      50
                    )}%)`,
                  }}
                  className={`each-letter-header-david ${small ? "small" : ""}`}
                >
                  {letter}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default forwardRef(HeaderDavidAnim);
