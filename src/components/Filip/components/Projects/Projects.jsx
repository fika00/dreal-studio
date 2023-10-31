import { useState, useRef } from "react";
import Project from "./Project/Project";
import "./Projects.scss";
import { useEffect } from "react";

const Projects = () => {
  const projRef = useRef();
  const containerRef = useRef();

  const [currentProj, setCurrentProj] = useState(0);

  const projects = [
    [
      "Machine Learning",
      "I made a project that leverages AI capabilities to ease government tasks.",
    ],
    [
      "Web Development",
      "Countless projects surrounding e-commerce and project management.",
    ],
    [
      "Game Development",
      "Currently have one game out on Play Store, Void Voyager.",
    ],
  ];

  const goNextProject = () => {
    if (currentProj == projects.length - 1) {
      setCurrentProj(0);
    } else {
      setCurrentProj(currentProj + 1);
    }
  };

  useEffect(() => {
    containerRef.current.style.opacity = 1;
    projRef.current.animate();
  }, [currentProj]);

  return (
    <>
      <div className="projects-container" ref={containerRef}>
        <Project
          title={projects[currentProj][0]}
          text={projects[currentProj][1]}
          callbackFunc={() => goNextProject()}
          ref={projRef}
        />
      </div>
    </>
  );
};

export default Projects;
