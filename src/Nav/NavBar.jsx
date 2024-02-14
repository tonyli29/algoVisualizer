import React from "react";
import "./NavBar.css";
const NavBar = (props) => {
  return (
    <div className="navbar-container">
      <button onClick={() => props.VisualizeDijkstra()}>
        Visualize Dijkstras
      </button>
      <button onClick={() => props.VisualizeAstar()}>Visualize A*</button>
      <button onClick={() => props.resetButton()}>Reset Board</button>
    </div>
  );
};

export default NavBar;
