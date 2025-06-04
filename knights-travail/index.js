/*
BFS the positions on the chessboard (enqueue the possible positions)
vertices are [x, y] pairs

*/

const MIN_NUMBER = 0
const MAX_NUMBER = 7
const POSSIBLE_MOVES = [
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1]
]

//function to check if a position is valid or not
function isValid(pos){
    return (
        pos[0] <= MAX_NUMBER && 
        pos[0] >= MIN_NUMBER && 
        pos[1] <= MAX_NUMBER && 
        pos[1] >= MIN_NUMBER &&
        pos.length == 2);
}

//function to check if two positions are equal
function equals(pos1, pos2){
    return (
        pos1[0] == pos2[0] &&
        pos1[1] == pos2[1]
    );
}


//function to get possible positions from current positions
function getPossibleMoves(pos){
    let list = [];
    POSSIBLE_MOVES.forEach((move) =>{
        let temp = [pos[0] + move[0], pos[1] + move[1]];
        if (isValid(temp)){
            list.push(temp);
        }
    });
    return list;
}

function contains(path, pos){
    for (const move in path){
        if(equals(move, pos)) return true;
    }
    return false;
}

function knight(start, end){
    if(!isValid(start) || !isValid(end)){
        return null;
    }

    let paths = [[start]];
    while(paths.length >= 0){
        let possiblePath = paths.shift();
        let lastPosition = possiblePath[possiblePath.length  - 1];

        if(equals(lastPosition, end)){
            return possiblePath
        }

        let possibleMoves = getPossibleMoves(lastPosition);

        for (const move of possibleMoves){
            if(!contains(possiblePath, move)){
                let newPath = [...possiblePath];
                newPath.push(move);
                if(equals(move, end)){
                    return newPath;
                } else{
                    paths.push(newPath);
                }
            }
            
        }
    }

}


