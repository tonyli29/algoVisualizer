import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra } from "./algorithms/dijkstra";

const PathFinder = props => {
  const [grid, setGrid] = useState([]);
  const [test, setTest] = useState([
    {
      num: 0
    },
    {
      num: 1
    }
  ]);

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
      visited: false,
      isWall: false
    };
  };

  function animateDijkstra(visitedNodesforAnimation) {
    for (let i = 0; i < visitedNodesforAnimation.length; i++) {
      setTimeout(() => {
        const node = visitedNodesforAnimation[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 5 * i);
    }
  }

  function VisualizeDijkstra() {
    const START = grid[START_ROW][START_COL];
    const FINISH = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesforAnimation = dijkstra(grid, START, FINISH);
    animateDijkstra(visitedNodesforAnimation);
    // dijkstra(grid, START, FINISH);
  }

  const handleClick = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: true };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  };

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
                isWall={node.isWall}
                visited={node.visited}
                handleClick={(row, col) => handleClick(row, col)}
              ></Node>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PathFinder;
