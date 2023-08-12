import { useState } from "react";
// import LandingPage from "./components/LandingPage";
// import SectionFilip from "./components/SectionFilip";
// import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
// import SectionStudi from "./components/Studi/SectionStudi";
import SectionBalsa from "./components/Balsa/SectionBalsa";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Loading from "./components/Loading/Loading";

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
      <Canvas>
        <ScrollControls
          style={{
            opacity: 0,
          }}
        >
          {/* <LandingPage isPhone={false} /> */}
          {/* <SectionFilip /> */}
          {/* <SectionStudi /> */}
          <SectionBalsa isPhone={isPhone()} />
          {/* <LoadingAnimation /> */}
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
