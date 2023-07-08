import { useState } from "react";
import LandingPage from "./components/LandingPage";

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
      <LandingPage isPhone={isPhoneProp} />
    </div>
  );
}

export default App;
