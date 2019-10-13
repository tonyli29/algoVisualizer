import React, { useState, useEffect } from "react";
import Node from "./Node/Node";

const PathFinder = props => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const nodes = getInitialGrid();
    setGrid(nodes);
    console.log(nodes);
  }, []);

  const getInitialGrid = () => {
    const initialGrid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = createNode(col, row);
        currentRow.push(currentNode);
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row == 10 && col == 5,
      isFinish: row == 10 && col == 45
    };
  };

  return (
    <div>
      {grid.map((row, rowId) => {
        return (
          <div key={rowId}>
            {row.map((node, nodeId) => (
              <Node
                key={nodeId}
                col={node.col}
                row={node.row}
                isStart={node.isStart}
                isFinish={node.isFinish}
              ></Node>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PathFinder;
