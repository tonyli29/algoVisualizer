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

  const nodeTracker = props.nodeTracker ? "node-tracker" : "";

  return (
    <div
      id={`node-${props.row}-${props.col}`}
      className={`node ${classNames} ${nodeTracker}`}
      onClick={() => props.handleMouseClick(props.row, props.col)}
      onMouseDown={() => props.mouseDown(props.row, props.col)}
      onMouseUp={() => props.mouseUp(props.row, props.col)}
      onMouseEnter={() => props.mouseEnter(props.row, props.col)}
    >
      {/* {props.row}|{props.col} */}
    </div>
  );
};
export default Node;
