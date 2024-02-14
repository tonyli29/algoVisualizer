export function astar(grid, startNode, finishNode) {
  startNode.f = 0;
  startNode.g = 0;
  const vistedNodes = [];
  const unvistedNodes = allNodes(grid);
  while (unvistedNodes.length) {
    sortNodesF(unvistedNodes);
    const closestNode = unvistedNodes.shift();
    if (closestNode.isWall) continue;
    // no solution
    if (closestNode.f === Infinity) return vistedNodes;
    closestNode.visited = true;
    vistedNodes.push(closestNode);
    if (closestNode === finishNode) return vistedNodes;
    // for animation
    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

function sortNodesF(unvistedNodes) {
  unvistedNodes.sort((a, b) => a.f - b.f);
}

function heuristic(currentNode, finishNode) {
  const h =
    Math.abs(currentNode.col - finishNode.col) +
    Math.abs(currentNode.row - finishNode.row);
  return h;
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvistedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const nodes of unvistedNeighbors) {
    nodes.g = node.g + 1;
    nodes.previousNode = node;
    nodes.h = heuristic(nodes, finishNode);
    nodes.f = nodes.g + nodes.h;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // for (let i = 0; i < diagonalNeighbors.length; i++) {
  //   neighbors.push(diagonalNeighbors[i]);
  // }
  return neighbors.filter((neighbors) => !neighbors.visited);
}

function getAllNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
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

export function astarShortest(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
