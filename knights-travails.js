/* 
Breadth first search:

Queues start (supplied) node
set current node as first node in queue (dequeue)
records current node as visited
Explores current nodes neighbours (current node + 1 valid move)
Ignores any nodes already classsed as visited
Checks if current node is target node (returns path & position if target found)
Records neighbour nodes as visited
Queues the neighbour nodes
*/

function knightMoves(start, end) {
    const queue = [[start, [start]]];
    const visited = new Set([start.toString()]);

    while (queue.length) {
        const [currentPosition, path] = queue.shift();
        const legalMoves = getValidMoves(currentPosition);

        for (const position of legalMoves) {
            if (visited.has(position.toString())) continue;

            if (position[0] === end[0] && position[1] === end[1]) {
                const optimalPath = [...path, position];
                pathFound(optimalPath);
                return;
            }
            visited.add(position.toString());
            queue.push([position, [...path, position]]);
        }
    }
}

const moves = [
    [1,2],
    [1,-2],
    [2,1],
    [2,-1],
    [-1,2],
    [-1,-2],
    [-2,1],
    [-2,-1]
];

function withinBounds(x,y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getValidMoves(position) {
    const [x,y] = position;

    if (!withinBounds(x,y)) return [];

    const validMoves = new Set();

    for (const [dx, dy] of moves) {
        const newX = x + dx;
        const newY = y + dy;
    
        if (withinBounds(newX, newY)) {
        validMoves.add(`${newX}, ${newY}`);
        }     
    }
    return Array.from(validMoves).map(position => position.split(',').map(Number));
}

function pathFound(optimalPath) {
    console.log(`You made it in ${optimalPath.length-1} moves!  Here's your path:`);
    while (optimalPath.length > 0) {
    console.log(optimalPath.shift());
    }
}    

knightMoves([0,0], [5,6]);