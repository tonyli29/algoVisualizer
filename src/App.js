import React from "react";
import "./App.css";
import "./visualizer/PathFinder";
import PathFinder from "./visualizer/PathFinder";
import "bootstrap/dist/css/bootstrap.min.css";

const App = props => {
  return (
    <div>
      <PathFinder></PathFinder>;
    </div>
  );
};

export default App;
