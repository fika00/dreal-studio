import ReactPlayer from "react-player";
import "./VideoSlide.scss";
import vid1_hevc from "/imgs/filip/videocontent/vid1.mp4";
import collection from "/imgs/filip/videocontent/collection.mp4";

const VideoSlide = () => {
  const videos = [vid1_hevc, collection];

  return (
    <div className="video-slide-container">
      {videos.map((video) => (
        <ReactPlayer url={video} playing loop muted playsinline />
      ))}
    </div>
  );
};

export default VideoSlide;
