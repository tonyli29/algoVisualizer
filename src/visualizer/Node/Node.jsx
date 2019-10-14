import React, { useState } from "react";
import "./Node.css";

const Node = props => {
  const [state, setState] = useState([]);

  const classNames = props.isStart
    ? "node-start"
    : props.isFinish
    ? "node-finish"
    : props.isWall
    ? "node-wall"
    : "";

  // const isVisited = props.visited ? "node-visited" : "";

  return (
    <div
      id={`node-${props.row}-${props.col}`}
      className={`node ${classNames}`}
      onClick={() => props.handleClick(props.row, props.col)}
    ></div>
  );
};
export default Node;
