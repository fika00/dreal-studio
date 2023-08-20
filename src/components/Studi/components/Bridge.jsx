import { Html, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import "./Bridge.css";
const Bridge = ({ callBackFunc }) => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  useEffect(() => {
    if (progress == 100) {
      callBackFunc();
    }
  }, [progress]);
  //   return (
  //     <Html center>
  //       <div id="bridge" className="bridge-cont"></div>;
  //     </Html>
  //   );
};

export default Bridge;
