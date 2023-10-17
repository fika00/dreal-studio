import { useEffect } from "react";
import "./HeaderDavid.scss";
import { useImperativeHandle, forwardRef } from "react";

const HeaderDavidAnim = ({ text, small }, ref) => {
  useImperativeHandle(ref, () => ({
    handleExit,
  }));
  let words;
  let splitted = text.split(" ");
  console.log(splitted.length);
  if (splitted.length == 1) {
    words = [splitted[0].substring(0, 5), splitted[0].substring(5)];
  } else {
    words = splitted;
  }
  console.log(words);

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleExit = () => {
    const letters = document.querySelectorAll(".letter-cont-david");

    letters.forEach((letter, index) => {
      letter.style.transform = `translateY(${
        (index + 1) % 2 == 0 ? `-100%` : `100%`
      })`;
    });
  };

  const handleEnter = () => {
    const letters = document.querySelectorAll(".letter-cont-david");

    letters.forEach((letter) => {
      letter.style.transform = "translateX(0)";
    });
  };

  useEffect(() => {
    setTimeout(() => {
      handleEnter();
      // handleExit();
      console.log("Entered");
    }, 1000);
  }, []);

  return (
    <>
      <div
        className={`wrapper-header-david-anim ${
          splitted.length == 1 ? `oneword` : ``
        }`}
      >
        {words.map((word, index) => (
          <div className="each-word" key={index}>
            <div
              key={index}
              className="letter-cont-david"
              style={{
                transform: `translateY(${
                  (index + 1) % 2 == 0 ? `-100` : `100`
                }%)`,
              }}
            >
              {word.split("").map((letter, index) => (
                <span
                  className={`each-letter-header-david ${small ? "small" : ""}`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default forwardRef(HeaderDavidAnim);
