import { Link } from "react-router-dom";
import "./Contact.scss";
import { useEffect, useState } from "react";
import { useImperativeHandle, forwardRef } from "react";

const Contact = ({ links }, ref) => {
  useImperativeHandle(ref, () => ({
    setIsVisible,
    toggleIsVisible,
  }));

  const [isVisible, setIsVisible] = useState(false);

  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const linkzz = document.querySelectorAll(".contact-text-anim");
    if (isVisible) {
      linkzz.forEach((ling) => (ling.style.transform = "translateY(0%)"));
    } else {
      linkzz.forEach((ling) => (ling.style.transform = "translateY(100%)"));
    }
  }, [isVisible]);
  return (
    <div className="contact-container">
      {links.map((contact, index) => (
        <div className="contact-wrapper" key={index}>
          <a target="_blank" className="contact-text-anim" href={contact[1]}>
            {contact[0]}
          </a>
        </div>
      ))}
    </div>
  );
};

export default forwardRef(Contact);
