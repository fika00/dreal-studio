import { useEffect } from "react";
import "./FrameWorksDavid.scss";
import { useImperativeHandle, forwardRef } from "react";

const FrameWorksDavid = ({ frameworks }, ref) => {
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
    <div className="frameworks-container-david">
      {frameworks.map((framework, index) => {
        return (
          <img src={framework} key={index} className="framework-icons" alt="" />
        );
      })}
    </div>
  );
};

export default forwardRef(FrameWorksDavid);
