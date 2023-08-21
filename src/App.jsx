import { Suspense, useRef, useState } from "react";
// import LandingPage from "./components/LandingPage";
// import SectionFilip from "./components/SectionFilip";
// import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import SectionStudi from "./components/Studi/SectionStudi";
import SectionBalsa from "./components/Balsa/SectionBalsa";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Html, ScrollControls } from "@react-three/drei";
import Loading from "./components/Loading/Loading";
import Bridge from "./components/Studi/components/Bridge";
import DiveIcon from "/icons/chevron-down-sharp.svg";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function App() {
  const [count, setCount] = useState(0);
  const studiRef = useRef();

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const isPhone = () => {
    if (screenSize.width < screenSize.height) {
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
        <Suspense fallback={null}>
          {/* <LandingPage isPhone={false} /> */}
          {/* <SectionFilip /> */}

          <SectionStudi ref={studiRef} />

          {/* <Bridge callBackFunc={handleDone()}/> */}
          {/* <ScrollControls
            pages={2}
            style={{
              opacity: 0,
            }}
          >
            <SectionBalsa isPhone={isPhone()} />
          </ScrollControls> */}

          {/* <LoadingAnimation /> */}
        </Suspense>
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          // backgroundColor: "wheat",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={() => studiRef.current.dive()}
      >
        <ChevronDownIcon
          width={40}
          style={{
            color: "white",
          }}
        />
      </div>

      {/* <Loading name={"Balsa Ratkovic"} /> */}
    </div>
  );
}

export default App;
