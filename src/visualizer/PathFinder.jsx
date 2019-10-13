import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import dijkstra from "./algorithms/dijkstra";

const PathFinder = props => {
  const [grid, setGrid] = useState([]);

  const START_ROW = 10;
  const START_COL = 5;
  const FINISH_ROW = 10;
  const FINISH_COL = 45;

  useEffect(() => {
    const nodes = getInitialGrid();
    setGrid(nodes);
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
      isStart: row == START_ROW && col == START_COL,
      isFinish: row == FINISH_ROW && col == FINISH_COL,
      distance: Infinity,
      visited: false
    };
  };

  function animateDijkstra(visitedNodesforAnimation) {
    for (let i = 0; i < visitedNodesforAnimation.length; i++) {
      setTimeout(() => {
        const node = visitedNodesforAnimation[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  function VisualizeDijkstra() {
    const START = grid[START_ROW][START_COL];
    const FINISH = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesforAnimation = dijkstra(grid, START, FINISH);
    animateDijkstra(visitedNodesforAnimation);
    // dijkstra(grid, START, FINISH);
  }

  return (
    <div>
      <button onClick={() => VisualizeDijkstra()}>test</button>
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
                visited={node.visited}
              ></Node>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PathFinder;
