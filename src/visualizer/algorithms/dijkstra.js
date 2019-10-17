export function dijkstra(grid, startNode, finishNode) {
  startNode.distance = 0;
  const vistedNodes = [];
  const unvistedNodes = allNodes(grid);
  while (!!unvistedNodes.length) {
    sortNodesDistance(unvistedNodes);
    const closestNode = unvistedNodes.shift();
    // closestNode.nodeTracker = true;
    // if (vistedNodes.length > 0)
    //   vistedNodes[vistedNodes.length - 1].nodeTracker = false;
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return vistedNodes;
    closestNode.visited = true;
    vistedNodes.push(closestNode);
    // for animation
    if (closestNode == finishNode) return vistedNodes;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesDistance(unvistedNodes) {
  unvistedNodes.sort((a, b) => a.distance - b.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvistedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const nodes of unvistedNeighbors) {
    nodes.distance = node.distance + 1;
    nodes.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
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
