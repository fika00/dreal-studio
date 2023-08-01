import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import studio from "@theatre/studio";
// import extention from "@theatre/r3f/dist/extension";

// studio.extend(extention);
// studio.initialize();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>
);
