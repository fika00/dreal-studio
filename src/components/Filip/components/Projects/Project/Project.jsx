import { useEffect } from "react";
import "./Project.scss";
import gsap from "gsap";
import { useState, useRef } from "react";
import { useImperativeHandle, forwardRef } from "react";

const Project = ({ title, text, callbackFunc }, ref) => {
  useImperativeHandle(ref, () => ({
    animate,
  }));
  const [isReady, setIsReady] = useState(true);
  const projectRef = useRef();

  let progress = 0;

  const animate = () => {
    const targetHeight = projectRef.current.scrollHeight + "px";
    // projectRef.current.style.opacity = 1;
    // projectRef.current.style.filter = "blur(0px)";
    projectRef.current.style.maxHeight = targetHeight;
    setTimeout(() => {
      // projectRef.current.style.opacity = 0;
      projectRef.current.style.maxHeight = "0px";

      // projectRef.current.style.filter = "blur(5px)";
      setTimeout(() => {
        callbackFunc();
      }, 2000);
    }, 6500);
  };

  return (
    <div className="project-container" ref={projectRef}>
      <div className="title-container">
        <span className="title">{title}</span>
      </div>
      <hr className="divider" />
      <div className="project-text-container">
        <p className="project-paragraph">{text}</p>
      </div>
    </div>
  );
};

export default forwardRef(Project);
