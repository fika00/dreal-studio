import "./HeroTextAnim.scss";

const HeroTextAnim = ({ text }) => {
  const letters = text.split("");
  console.log(letters);

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
