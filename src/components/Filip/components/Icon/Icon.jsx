import { useRef, useState } from "react";
import "./Icon.scss";

const Icon = ({ art, isSmall }) => {
  const divRef = useRef();
  const [isSelected, setIsSeleced] = useState(false);
  const handleSelect = () => {
    setIsSeleced(true);
    setTimeout(() => {
      setIsSeleced(false);
    }, 1500);
  };
  return (
    <div
      ref={divRef}
      className={`outter-circle ${isSelected ? "selected" : ""} ${
        isSmall ? "small" : ""
      }`}
      onClick={handleSelect}
    >
      <img src={art} alt="" className={`icon-itself`} />
    </div>
  );
};

export default Icon;
