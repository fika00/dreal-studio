import { useImperativeHandle, forwardRef, useEffect } from "react";
const FromOriginAnim = (props, ref) => {
  const startOriginAnim = () => {
    const letters = document.querySelectorAll(".FromOriginAnim_letter");
    let i = 0;
    const intervalAnim = setInterval(() => {
      letters[i].style.transform = "translateX(0%)";
      letters[i].style.opacity = 1;
      letters[i].style.filter = "blur(0px)";

      if (letters.length == i - 1) {
        clearInterval(intervalAnim);
      }
      i += 1;

      console.log("da", i, letters.length);
    }, 200);
  };
  useEffect(() => {
    startOriginAnim();
  }, []);
  return (
    <div className="sloganwrapper">
      {props.text.split(" ").map((word, index) => {
        return (
          <div className="word" key={word}>
            {word.split("").map((letter, index_letter) => {
              return (
                <span
                  key={letter + index_letter}
                  className="FromOriginAnim_letter"
                  style={{
                    transform: `translateX(${index_letter * -100}%)`,
                    opacity: 0,
                    filter: "blur(10px)",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default forwardRef(FromOriginAnim);
