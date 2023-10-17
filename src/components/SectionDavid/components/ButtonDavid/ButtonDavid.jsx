import { useEffect, useRef } from "react";
import "./ButtonDavid.scss";
import { useImperativeHandle, forwardRef } from "react";

const ButtonDavid = ({ onClickCallback }, ref) => {
  useImperativeHandle(ref, () => ({
    exit,
    enter,
  }));
  const buttonRef = useRef();
  const exit = () => {
    buttonRef.current.style.opacity = 0;
  };
  const enter = () => {
    buttonRef.current.style.opacity = 1;
  };
  useEffect(() => {
    setTimeout(() => {
      enter();
    }, 3000);
  }, []);
  return (
    <div
      ref={buttonRef}
      className="button-david-container"
      onClick={() => onClickCallback()}
    >
      <span className="button-david-text">Learn More</span>
    </div>
  );
};

export default forwardRef(ButtonDavid);
