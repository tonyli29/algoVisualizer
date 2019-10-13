import React, { useState } from "react";
import "./Node.css";

const Node = props => {
  const [state, setState] = useState([]);

  const isStartorFinish = props.isStart
    ? "node-start"
    : props.isFinish
    ? "node-finish"
    : "";

  // const isVisited = props.visited ? "node-visited" : "";

  return (
    <div
      id={`node-${props.row}-${props.col}`}
      className={`node ${isStartorFinish}`}
    ></div>
  );
};

export default Node;
