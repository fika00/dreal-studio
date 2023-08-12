import { Html, useProgress } from "@react-three/drei";
import "./Loading.css";
const Loading = ({ name }) => {
  //   const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html center>
      <div className="loading-container">
        <div className="loading-info">
          <div className="loading-info-prog">
            <p className="text">Loading...</p>
            <p className="text"></p>
          </div>
          <div className="text small">
            <p className="text small">{name}</p>
          </div>
        </div>
      </div>
    </Html>
  );
};

export default Loading;
