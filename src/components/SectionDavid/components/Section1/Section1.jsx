import ButtonDavid from "../ButtonDavid/ButtonDavid";
import HeaderDavid from "../Header/HeaderDavid";
import SubHeader from "../SubHeader/SubHeader";
import { useRef, useState } from "react";
import "./Section1.scss";
import { useImperativeHandle, forwardRef } from "react";

const Section1 = ({ callBackProp }, ref) => {
  useImperativeHandle(ref, () => ({
    exit,
    enter,
  }));
  const headerRef = useRef();
  const subHeaderRef = useRef();
  const [isVisible, setIsVisible] = useState(true);
  const buttonRef = useRef();

  const exit = () => {
    if (isVisible) {
      headerRef.current.handleExit();
      subHeaderRef.current.handleExit();
      buttonRef.current.exit();
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }
  };
  const enter = () => {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  };
  return (
    <>
      {isVisible && (
        <div className="section1-container">
          <HeaderDavid text={"David Vojvoda"} ref={headerRef} />
          <SubHeader text={"Multimedia Artist"} ref={subHeaderRef} />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ButtonDavid
              onClickCallback={() => {
                callBackProp();
                exit();
              }}
              ref={buttonRef}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(Section1);
