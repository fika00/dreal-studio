import { useEffect } from "react";
import { useRef } from "react";
import "./FrameWorks.scss";
import { useImperativeHandle, forwardRef } from "react";

const FrameWorks = ({ frameworks }, ref) => {
  useImperativeHandle(ref, () => ({
    exit,
  }));
  const enter = () => {
    const icons = document.querySelectorAll(".framework-icons");
    let i = 0;
    const interval = setInterval(() => {
      icons[i].style.transform = "translateY(0)";
      icons[i].style.opacity = 1;

      i++;
      if (i == icons.length) {
        clearInterval(interval);
      }
    }, 100);
  };
  const exit = () => {
    const icons = document.querySelectorAll(".framework-icons");
    let i = 0;
    const interval = setInterval(() => {
      icons[i].style.transform = "translateY(50%)";
      icons[i].style.opacity = 0;

      i++;
      if (i == icons.length) {
        clearInterval(interval);
      }
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      enter();
    }, 1300);
  }, []);
  return (
    <div className="frameworks-container">
      {frameworks.map((framework, index) => {
        return (
          <Framework key={index} image={framework[0]} text={framework[1]} />
        );
      })}
    </div>
  );
};

const Framework = (props) => {
  const spanRef = useRef();

  const frameworkTextAppear = () => {
    spanRef.current.style.opacity = 1;
  };
  const frameworkTextDisappear = () => {
    spanRef.current.style.opacity = 0;
  };
  return (
    <div className="framework-cont">
      <img src={props.image} className="framework-icons" />
      <span ref={spanRef} className="framework-text">
        {props.text}
      </span>
    </div>
  );
};

export default forwardRef(FrameWorks);
