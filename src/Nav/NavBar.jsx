import React from "react";
import VisualizeDijkstra from "../visualizer/PathFinder";

const NavBar = props => {
  return (
    <div>
      <button onClick={() => props.VisualizeDijkstra()}>
        Visualize Dijkstras
      </button>
      <button onClick={() => props.VisualizeAstar()}>Visualize Astar</button>
      <button onClick={() => props.resetButton()}>Reset Board</button>
      <button onClick={() => props.removeVisted()}>Reset Visted</button>
    </div>
  );
};

export default NavBar;
