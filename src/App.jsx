import { Suspense, useRef, useState } from "react";
import LandingPage from "./components/LandingPage";
// import SectionFilip from "./components/SectionFilip";
// import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import SectionStudi from "./components/Studi/SectionStudi";
import SectionBalsa from "./components/Balsa/SectionBalsa";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Html, ScrollControls } from "@react-three/drei";
import Loading from "./components/Loading/Loading";
import Bridge from "./components/Studi/components/Bridge";
import DiveIcon from "/icons/chevron-down-sharp.svg";
import SectionStevo from "./components/Stevo/SectionStevo";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MenuDropDown from "./components/MenuDropDown/MenuDropDown";
import "./App.css";

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
    <Router>
      <div
        className="wholepage"
        style={{
          width: screenSize.width,
          height: screenSize.height,
          backgroundColor: "black",
        }}
      >
        <Routes>
          <Route exact path="/" element={<LandingPage isPhone={false} />} />
          <Route path="/studi" element={<SectionStudi />} />
          <Route path="/stevo" element={<SectionStevo />} />
          <Route path="/baki" element={<SectionBalsa />} />

          {/* <Route path="/contact" component={Contact} /> */}
        </Routes>
        <div className="dropdown">
          <MenuDropDown />
        </div>

        {/* <SectionFilip /> */}

        {/* <Bridge callBackFunc={handleDone()}/> */}

        {/* <LoadingAnimation /> */}
        {/* </Suspense> */}
        {/* <SectionStevo /> */}
        {/* </Canvas> */}
      </div>
    </Router>
  );
}

export default App;
