import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import "./PathFinder.css";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { astar, astarShortest } from "./algorithms/astar.js";

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
      testPrevious: [],
      mousePressed: false,
      nodeTracker: false,
      diagonal: [],
      f: Infinity,
      g: Infinity,
      h: 0
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
        }, 10 * i);
      }
      setTimeout(() => {
        const node = visitedNodesforAnimation[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  function animateAstar(visitedNodesforAnimation) {
    for (let i = 0; i < visitedNodesforAnimation.length; i++) {
      if (i + 1 === visitedNodesforAnimation.length) {
        const shortestPath = astarShortest(grid[FINISH_ROW][FINISH_COL]);
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 7 * i);
      }
      setTimeout(() => {
        const node = visitedNodesforAnimation[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 7 * i);
    }
  }

  function animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest";
      }, 30 * i);
    }
  }

  function VisualizeDijkstra() {
    const START = grid[START_ROW][START_COL];
    const FINISH = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesforAnimation = dijkstra(grid, START, FINISH);
    animateDijkstra(visitedNodesforAnimation);
  }

  function VisualizeAstar() {
    const START = grid[START_ROW][START_COL];
    const FINISH = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesforAnimation = astar(grid, START, FINISH);
    animateAstar(visitedNodesforAnimation);
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

  function resetButton() {
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        if (col === START_COL && row === START_ROW) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start";
        } else if (col === FINISH_COL && row === FINISH_ROW) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-finish";
        } else {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }

    setGrid(getInitialGrid());
  }

  function removeVisted() {
    for (let i = 0; i < grid.length; i++) {
      const element = grid[i];
      for (let j = 0; j < element.length; j++) {
        console.log(element[j]);
        if (element[j].isWall || element[j].isStart || element[j].isFinish) {
          continue;
        } else {
          document.getElementById(
            `node-${element[j].row}-${element[j].col}`
          ).className = "node";
        }
      }
    }
  }

  return (
    <div className="main-container">
      <button onClick={() => VisualizeDijkstra()}>Visualize</button>
      <button onClick={() => resetButton()}>Reset</button>
      <button onClick={() => VisualizeAstar()}>Astar</button>
      <button onClick={() => removeVisted()}>Asdddtar</button>
      <div className="main-grid">
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
    </div>
  );
};

export default PathFinder;
