import React, { useState } from "react";
import "./Node.css";

const Node = props => {
  const [state, setState] = useState([]);

  const isStartorFinish = props.isStart
    ? "node-start"
    : props.isFinish
    ? "node-finish"
    : "";

  return <div className={`node ${isStartorFinish}`}></div>;
};

export default Node;
