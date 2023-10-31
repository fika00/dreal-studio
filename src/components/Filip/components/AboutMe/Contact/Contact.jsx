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
          <Link className="contact-text-anim" to={contact[1]}>
            {contact[0]}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default forwardRef(Contact);
