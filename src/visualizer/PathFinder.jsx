import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";

const PathFinder = props => {
  const [grid, setGrid] = useState([]);
  const [mouse, setMouse] = useState({ mousePressed: false });

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
      isWall: false,
      previousNode: null,
      mousePressed: false,
      nodeTracker: false
    };
  };

  function animateDijkstra(visitedNodesforAnimation) {
    for (let i = 0; i < visitedNodesforAnimation.length; i++) {
      if (i + 1 === visitedNodesforAnimation.length) {
        const shortestPath = getNodesInShortestPathOrder(
          grid[FINISH_ROW][FINISH_COL]
        );
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 8 * i);
      }
      setTimeout(() => {
        const node = visitedNodesforAnimation[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 5 * i);
    }
  }

  function animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest";
      }, 10 * i);
    }
  }

  function VisualizeDijkstra() {
    const START = grid[START_ROW][START_COL];
    const FINISH = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesforAnimation = dijkstra(grid, START, FINISH);
    animateDijkstra(visitedNodesforAnimation);
  }

  function handleMouseClick(row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  }

  function mouseDown(row, col) {
    setMouse({
      mousePressed: true
    });
  }
  function mouseUp(row, col) {
    setMouse({
      mousePressed: false
    });
  }
  function mouseEnter(row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (mouse.mousePressed) {
      const newNode = { ...node, isWall: true };
      newGrid[row][col] = newNode;
      setGrid(newGrid);
    }
  }

  return (
    <div>
      <button onClick={() => VisualizeDijkstra()}>test</button>
      <button
        onClick={() =>
          getNodesInShortestPathOrder(grid[FINISH_ROW][FINISH_COL])
        }
      >
        test
      </button>

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
                nodeTracker={node.nodeTracker}
                handleMouseClick={(row, col) => handleMouseClick(row, col)}
                mouseDown={(row, col) => mouseDown(row, col)}
                mouseUp={(row, col) => mouseUp(row, col)}
                mouseEnter={(row, col) => mouseEnter(row, col)}
              ></Node>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PathFinder;
