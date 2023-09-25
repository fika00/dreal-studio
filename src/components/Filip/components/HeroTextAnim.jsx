import { useEffect } from "react";
import "./HeroTextAnim.scss";

const HeroTextAnim = ({ text }) => {
  const letters = text.split("");
  console.log(letters);

  const animate = () => {
    const letterArray = document.querySelectorAll(".each-letter");

    let i = 0;

    const interval = setInterval(() => {
      letterArray[i].style.transform = "translateY(0%)";
      letterArray[i].style.filter = "blur(0px)";
      i++;
      if (i == letterArray.length) {
        clearInterval(interval);
      }
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      animate();
    }, 4000);
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

export default HeroTextAnim;
