import { useRef } from "react";
import "./ButtonDreal.scss";

const ButtonDreal = ({ onClick, text, noHide }) => {
  const buttonRef = useRef();
  return (
    <div
      ref={buttonRef}
      className="custom-button"
      onClick={() => {
        if (!noHide) {
          buttonRef.current.style.opacity = 0;
          buttonRef.current.style.zIndex = 0;
        }
        onClick();
      }}
    >
      <span className="button-text">{text}</span>
    </div>
  );
};

export default ButtonDreal;
