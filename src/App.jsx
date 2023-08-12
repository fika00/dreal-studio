import { useState } from "react";
import LandingPage from "./components/LandingPage";
import SectionFilip from "./components/SectionFilip";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import SectionStudi from "./components/Studi/SectionStudi";
import SectionBalsa from "./components/Balsa/SectionBalsa";

function App() {
  const [count, setCount] = useState(0);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const isPhone = () => {
    if (screenSize.width * 2 < screenSize.height) {
      return true;
    } else {
      return false;
    }
  };
  const isPhoneProp = isPhone();
  return (
    <div
      className="wholepage"
      style={{
        width: screenSize.width,
        height: screenSize.height,
        backgroundColor: "black",
      }}
    >
      {/* <LandingPage isPhone={false} /> */}
      {/* <SectionFilip /> */}
      {/* <SectionStudi /> */}
      <SectionBalsa isPhone={isPhone()} />
      {/* <LoadingAnimation /> */}
    </div>
  );
}

export default App;
