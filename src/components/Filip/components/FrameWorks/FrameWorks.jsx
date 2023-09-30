import { useEffect } from "react";
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
    }, 150);
  };
  const exit = () => {
    const icons = document.querySelectorAll(".framework-icons");
    let i = 0;
    const interval = setInterval(() => {
      icons[i].style.transform = "translateY(-50%)";
      icons[i].style.opacity = 0;

      i++;
      if (i == icons.length) {
        clearInterval(interval);
      }
    }, 150);
  };
  useEffect(() => {
    setTimeout(() => {
      enter();
    }, 1000);
  }, []);
  return (
    <div className="frameworks-container">
      {frameworks.map((framework, index) => {
        return (
          <img src={framework} key={index} className="framework-icons" alt="" />
        );
      })}
    </div>
  );
};

export default forwardRef(FrameWorks);
