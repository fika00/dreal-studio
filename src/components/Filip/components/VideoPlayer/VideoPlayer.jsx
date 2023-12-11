import ReactPlayer from "react-player";
import "./VideoPlayer.scss";
import site1 from "/imgs/filip/videocontent/sites/site1.webm";
import site2 from "/imgs/filip/videocontent/sites/site2.webm";
import site3 from "/imgs/filip/videocontent/sites/site3.webm";
import site4 from "/imgs/filip/videocontent/sites/site4.webm";
// import loader from "/imgs/filip/videocontent/sites/loader.gif";

import arrow from "/imgs/david/nav-icon.svg";
import { useEffect, useRef, useState } from "react";

const VideoPlayer = () => {
  const [currentVid, setCurrentVid] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const videos = [site1, site2, site3, site4];

  const blackScreenRef = useRef();
  const loaderRef = useRef();

  const navigate = (dir) => {
    setIsReady(false);
    setTimeout(() => {
      setCurrentVid((prev) => {
        if (prev + dir < 0) {
          return videos.length - 1;
        } else if (prev + dir > videos.length - 1) {
          return 0;
        } else {
          return prev + dir;
        }
      });
    }, 750);
  };

  useEffect(() => {
    console.log(currentVid);
  }, [currentVid]);

  useEffect(() => {
    if (isReady) {
      blackScreenRef.current.style.opacity = 0;
    } else {
      blackScreenRef.current.style.opacity = 1;
    }
  }, [isReady]);

  return (
    <>
      {isVisible && (
        <div className="site-video-player">
          <ReactPlayer
            url={videos[currentVid]}
            muted
            playsinline
            loop
            playing
            width={"100%"}
            height={"100%"}
            style={{ position: "relative" }}
            onReady={() => setIsReady(true)}
          />
          <div className="black-screen" ref={blackScreenRef}></div>
          <div className="nav-buttons">
            <div className="nav-button left" onClick={() => navigate(-1)}>
              <img src={arrow} alt="" className="arrow left-arrow" />
            </div>
            <div className="nav-button right" onClick={() => navigate(1)}>
              <img src={arrow} alt="" className="arrow right-arrow" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
