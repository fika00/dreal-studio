import { Html, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import "./Loading.css";
import loadingVideo from "/loader/loading.mp4";
import loadingGif from "/loader/loading.gif";

const Loading = ({ name, onReady }) => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  // const realProgress = useRef(0);
  const fadeOut = () => {
    const container = cont.style;
    container.opacity = 0;
    setTimeout(() => {
      container.zIndex = -1;
    }, 750);
  };

  useEffect(() => {
    // if (realProgress.current <= progress) {
    //   realProgress.current = progress;
    // }
    // if (realProgress.current != 0 && progress == 0) {
    //   realProgress.current = 100;
    // }
    if (progress.toFixed(0) == 100) {
      setTimeout(() => {
        fadeOut();
      }, 1500);
      if (typeof onReady === "function") {
        onReady();
      }
    }
    console.log(progress);
  }, [progress]);

  return (
    <div id="cont" className="loading-container">
      {/* <div className="loading-info">
        <div className="loading-info-prog">
          <p className="text">Loading...</p>
          <p className="text">{realProgress.current.toFixed(0)}%</p>
        </div>
        <div className="text small">
          <p className="text small">{name}</p>
        </div>
      </div> */}
      <div className="videoContainter">
        {/* <video
          style={{
            width: "100%",
          }}
          src={loadingVideo}
          muted
          autoPlay
          loop
          playsInline
        /> */}
        <img width={"100%"} src={loadingGif} alt="" />
      </div>
    </div>
  );
};

export default Loading;
