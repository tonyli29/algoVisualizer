import { clone } from "@babel/types";

export function dijkstra(grid, startNode, finishNode) {
  startNode.distance = 0;
  const vistedNodes = [];
  const unvistedNodes = allNodes(grid);
  var UP = false;
  while (!!unvistedNodes.length) {
    sortNodesDistance(unvistedNodes);
    const closestNode = unvistedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return vistedNodes;
    closestNode.visited = true;
    vistedNodes.push(closestNode);
    // for animation
    if (closestNode == finishNode) return vistedNodes;

    // if (closestNode.previousNode !== null) {
    //   if (closestNode.previousNode.row > closestNode.row) {
    //     var UP = true;
    //   } else if (closestNode.previousNode.row < closestNode.row) {
    //     var UP = false;
    //   }
    // } else {
    //   updateUnvisitedNeighborsDOWN(closestNode, grid);
    // }
    // if (UP) {
    //   updateUnvisitedNeighborsUP(closestNode, grid);
    // } else {
    //   updateUnvisitedNeighborsDOWN(closestNode, grid);
    // }

    updateUnvisitedNeighborsUP(closestNode, grid);
  }
}

function sortNodesDistance(unvistedNodes) {
  unvistedNodes.sort((a, b) => a.distance - b.distance);
}

// makes weighted when going down
function updateUnvisitedNeighborsDOWN(node, grid) {
  const unvistedNeighbors = getUnvisitedNeighbors(node, grid);
  const diagonalNeighbors = getDiagonalNeighbors(node, grid);
  node.diagonal = diagonalNeighbors;
  for (const nodes of unvistedNeighbors) {
    const previous = nodes.previousNode;
    // Trying to make dijkstra weighted
    if (previous === null || previous.previousNode === null) {
      nodes.distance = node.distance + 1;
      nodes.previousNode = node;
    } else {
      nodes.distance = node.distance + 1;
      nodes.previousNode = node;
    }
  }
}

// makes weighted going up
function updateUnvisitedNeighborsUP(node, grid) {
  const unvistedNeighbors = getUnvisitedNeighbors(node, grid);
  const diagonalNeighbors = getDiagonalNeighbors(node, grid);
  node.diagonal = diagonalNeighbors;
  for (const nodes of unvistedNeighbors) {
    const { row, col } = nodes;
    const previous = nodes.previousNode;
    // Trying to make dijkstra weighted
    if (previous === null) {
      nodes.distance = node.distance + 1;
      nodes.previousNode = node;
    }

    // nodes.distance = node.distance + 1;
    // nodes.previousNode = node;
    // console.log("if");
  }
}
function updateUnvisitedNeighborsNEUTRAL(node, grid) {
  const unvistedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const nodes of unvistedNeighbors) {
    nodes.distance = node.distance + 1;
    nodes.previousNode = node;
  }
}

export function getDiagonalNeighbors(node, grid) {
  const diagonalNeighbors = [];
  const { row, col } = node;
  if (row === 0 && col === 0) {
    diagonalNeighbors.push(grid[row + 1][col + 1]);
    // console.log(diagonalNeighbors);
    return diagonalNeighbors;
  }
  if (row === 0 && col === 49) {
    diagonalNeighbors.push(grid[row + 1][col - 1]);
    // console.log(diagonalNeighbors);
    return diagonalNeighbors;
  }
  if (row === 19 && col === 0) {
    diagonalNeighbors.push(grid[row - 1][col + 1]);
    // console.log(diagonalNeighbors);
    return diagonalNeighbors;
  }
  if (row === 19 && col === 49) {
    diagonalNeighbors.push(grid[row - 1][col - 1]);
    // console.log(diagonalNeighbors);
    return diagonalNeighbors;
  }
  if (row === 0) {
    diagonalNeighbors.push(grid[row + 1][col - 1], grid[row + 1][col + 1]);
    // console.log(diagonalNeighbors);
    return diagonalNeighbors;
  }
  if (row === 19) {
    diagonalNeighbors.push(grid[row - 1][col - 1], grid[row - 1][col + 1]);
    // console.log(diagonalNeighbors);
    return diagonalNeighbors;
  }
  if (col === 0) {
    diagonalNeighbors.push(grid[row + 1][col + 1], grid[row - 1][col + 1]);
    // console.log(diagonalNeighbors);
    return diagonalNeighbors;
  }
  if (col === 49) {
    diagonalNeighbors.push(grid[row + 1][col - 1], grid[row - 1][col - 1]);
    // console.log(diagonalNeighbors);
    return diagonalNeighbors;
  }
  if (row > 0)
    diagonalNeighbors.push(grid[row - 1][col - 1], grid[row - 1][col + 1]);
  if (row < grid.length - 1)
    diagonalNeighbors.push(grid[row + 1][col - 1], grid[row + 1][col + 1]);
  // console.log(diagonalNeighbors);
  return diagonalNeighbors;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const diagonalNeighbors = getDiagonalNeighbors(node, grid);
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // for (const dia in diagonalNeighbors) {
  //   neighbors.push(dia);
  // }
  return neighbors.filter(neighbors => !neighbors.visited);
}

function allNodes(grid) {
  const allNodes = [];
  for (const row of grid) {
    for (const node of row) {
      allNodes.push(node);
    }
  }
  return allNodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
