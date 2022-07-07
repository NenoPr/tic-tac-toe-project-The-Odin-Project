const gameBoard = () => {
    let gameBoardArray = [["Start at index 1"],
                            ['_','_','_'],
                            ['_','_','_'],
                            ['_','_','_']];

    let classCell = document.querySelectorAll(".gamecell")
    let cover = document.getElementById("cover")

    let turn = true;
    let counter = 0;

    let winnerText = document.getElementById("winner-text")
    let playAgain = document.getElementById("play-again")
    let yesAgain = document.getElementById("yes-again")
    let noAgain = document.getElementById("no-again")

    let sound1 = document.getElementById("audio1")
    let sound2 = document.getElementById("audio2")
    let sound3 = document.getElementById("audio3")
    let sound4 = document.getElementById("audio4")

    let gameMode = true;

    let playerVsPlayer = document.getElementById("vsplayer")
    let playerVsBot = document.getElementById("vsbot")

    playerVsPlayer.addEventListener("click", () => {
        gameMode = true;
        playerVsPlayer.style.border = ".1rem solid white"
        playerVsPlayer.style.borderBottom = ".1rem solid black"

        playerVsBot.style.borderBottom = "none"
        playerVsBot.style.border = ".1rem solid black"
        document.getElementById("player2").value = "You?"
        reset()
    })

    playerVsBot.addEventListener("click", () => {
        gameMode = false;
        playerVsBot.style.border = ".1rem solid white"
        playerVsBot.style.borderBottom = ".1rem solid black"

        playerVsPlayer.style.borderBottom = "none"
        playerVsPlayer.style.border = ".1rem solid black"
        document.getElementById("player2").value = "BadBot 3000"
        reset()
    })

    classCell.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            if (element.attributes.data.value == 0){
                sound1.play()
                console.log("hit")
                // element.style.cssText = "background-color: rgba(128, 128, 128, 0.9);"
                if (game1.turn) {
                let xmark1 = document.createElement("div")
                xmark1.className = "marker xmark1"
                element.appendChild(xmark1)
                let xmark2 = document.createElement("div")
                xmark2.className = "marker xmark2"
                element.appendChild(xmark2)
                } else {
                    let omark = document.createElement("div")
                    omark.className = "marker omark"
                    element.appendChild(omark)
                }
            } else return
        })
    })
    
    classCell.forEach((element) => {
        element.addEventListener("mouseleave", () => {
            if (element.attributes.data.value == 0){

                if (element.childNodes.length == 1) {
                    element.childNodes[0].remove()
                } else {
                    element.childNodes[0].remove()
                    element.childNodes[0].remove()
                }
                }
        })
    })
    
    classCell.forEach((element) => {
        element.addEventListener("click", () => {
            if (element.attributes.data.value == 0){
                sound2.pause()
                sound1.pause()
                sound2.play()
                console.log("hit")
                if (element.childNodes.length == 1){
                    element.childNodes[0].remove()
                } else {
                    element.childNodes[0].remove()
                    element.childNodes[0].remove()
                }
            } else {
                sound3.play()
            }
        })
    })

    classCell.forEach((cells) => {
        cells.addEventListener("click", function addEvents() {
    
            if (cells.attributes.data.value == 1) {
                return
            } else {
                if (gameMode) {
                    updateArray(cells.id[4],cells.id[5]) // takes last char from string which is a number position
                    makeSymbol(cells)
                    game1.turn = !game1.turn;
                    checkWinCondition()
                } else {
                    updateArray(cells.id[4],cells.id[5]) // takes last char from string which is a number position
                    makeSymbol(cells)
                    if (checkWinCondition()) {
                        game1.turn = !game1.turn;
                        let moves = MinMaxAI()
                        game1.gameBoardArray[moves.row][moves.col] = "O"
                        let movesStr = moves.row + "" + moves.col;
                        makeSymbol(document.getElementById(`cell${movesStr}`))
                        game1.turn = !game1.turn;
                        checkWinCondition()
                    }
                }
            }
        })
    })

    function reset() {
        let markers = document.querySelectorAll(".marker")
        markers.forEach(element => {
            element.remove()
        })
        classCell.forEach(element => {
            element.style.backgroundColor = ""
        })
        game1.gameBoardArray = ["Start at index 1",
                                ['_','_','_'],
                                ['_','_','_'],
                                ['_','_','_']];

        winnerText.style.visibility = "hidden"
        playAgain.style.visibility = "hidden"
        cover.style.visibility = "hidden"
        counter = 0
        game1.turn = true

        classCell.forEach((cells) => {
            cells.attributes.data.value = 0;
        })
        console.log(game1.turn)
    }

    yesAgain.addEventListener("click", event => {

        reset()
        
    })

    const initializeGame = () => {}

    const MinMaxAI = () => {

        // MinMax 

        // Javascript program to find the
        // next optimal move for a player
        class Move
        {
        constructor()
        {
            let row,col;
        }
        }

        let player = 'X', opponent = 'O';

        // This function returns true if there are moves
        // remaining on the board. It returns false if
        // there are no moves left to play.
        function isMovesLeft(board)
        {
        for(let i = 1; i < 3; i++)
            for(let j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;
                
        return false;
        }

        // This is the evaluation function as discussed
        // in the previous article ( http://goo.gl/sJgv68 )
        function evaluate(b)
        {
        
            // Checking for Rows for X or O victory.
            for(let row = 1; row <= 3; row++)
            {
                if (b[row][0] == b[row][1] &&
                b[row][1] == b[row][2])
                {
                if (b[row][0] == player)
                    return +10;
                    
                else if (b[row][0] == opponent)
                    return -10;
                }
            }

            // Checking for Columns for X or O victory.
            for(let col = 0; col < 3; col++)
            {
                if (b[1][col] == b[2][col] && b[2][col] == b[3][col])
                {
                if (b[1][col] == player)
                    return +10;

                else if (b[1][col] == opponent)
                    return -10;
                }
            }

            // Checking for Diagonals for X or O victory.
            if (b[1][0] == b[2][1] && b[2][1] == b[3][2])
            {
                if (b[1][0] == player)
                return +10;
                
                else if (b[1][0] == opponent)
                return -10;
            }

            if (b[1][2] == b[2][1] && b[2][1] == b[3][0])
            {
                if (b[1][2] == player)
                return +10;
                
                else if (b[1][2] == opponent)
                return -10;
            }

            // Else if none of them have
            // won then return 0
            return 0;
        }

        // This is the minimax function. It
        // considers all the possible ways
        // the game can go and returns the
        // value of the board
        function minimax(board, depth, isMax)
        {
            let score = evaluate(board);

            // If Maximizer has won the game
            // return his/her evaluated score
            if (score == 10)
                return score;

            // If Minimizer has won the game
            // return his/her evaluated score
            if (score == -10)
                return score;

            // If there are no more moves and
            // no winner then it is a tie
            if (isMovesLeft(board) == false)
                return 0;

            // If this maximizer's move
            if (isMax)
            {
                let best = -1000;

                // Traverse all cells
                for(let i = 1; i <= 3; i++)
                {
                    for(let j = 0; j < 3; j++)
                    {
                        
                        // Check if cell is empty
                        if (board[i][j]=='_')
                        {
                            
                            // Make the move
                            board[i][j] = player;

                            // Call minimax recursively
                            // and choose the maximum value
                            let check = best;
                            best = Math.max(best, minimax(board,
                                    depth - 1, !isMax));
                            if (check > best) {
                                best = check
                            }

                            // Undo the move
                            board[i][j] = '_';
                        }
                    }
                }
                return best;
            }

            // If this minimizer's move
            else
            {
                let best = 1000;

                // Traverse all cells
                for(let i = 1; i <= 3; i++)
                {
                    for(let j = 0; j < 3; j++)
                    {
                        
                        // Check if cell is empty
                        if (board[i][j] == '_')
                        {
                        
                            // Make the move
                            board[i][j] = opponent;

                            // Call minimax recursively and
                            // choose the minimum value
                            let check2 = best
                            best = Math.min(best, minimax(board,
                                    depth + 1, !isMax));

                            if (check2 > best) {
                                best = check2
                            }

                            // Undo the move
                            board[i][j] = '_';
                        }
                    }
                }
                return best;
                }
            }

        // This will return the best possible
        // move for the player
        function findBestMove(board)
        {
        let bestVal = -1000;
        let bestMove = new Move();
        bestMove.row = -1;
        bestMove.col = -1;

        // Traverse all cells, evaluate
        // minimax function for all empty
        // cells. And return the cell
        // with optimal value.
        for(let i = 1; i <= 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                
                // Check if cell is empty
                if (board[i][j] == '_')
                {
                    
                    // Make the move
                    board[i][j] = player;

                    // compute evaluation function
                    // for this move.
                    let moveVal = minimax(board, 0, false);

                    // Undo the move
                    board[i][j] = '_';

                    // If the value of the current move
                    // is more than the best value, then
                    // update best
                    if (moveVal > bestVal)
                    {
                        bestMove.row = i;
                        bestMove.col = j;
                        bestVal = moveVal;
                    }
                }
            }
        }

        console.log("The value of the best Move " +
                "is : ", bestVal);

        return bestMove;
        }

        // Driver code
        let board = game1.gameBoardArray;
        let bestMove = findBestMove(board);

        console.log("The Optimal Move is :");
        console.log("ROW: " + bestMove.row +
            " COL: "+ bestMove.col);

        return bestMove

        // This code is contributed by rag2127
    }

    const players = () => {
        if (!document.getElementById("player1").value) {
            let player1 = document.getElementById("player1").value = "You"
        }
        if (!document.getElementById("player2").value) {
            let player2 = document.getElementById("player2").value = "You?"
        }
        return player1.value
            
    }

    const makeSymbol = (cells) => {

        // Creates the X or O symbol based on the players turn
        if (game1.turn) {
            cells.attributes.data.value = 1
            let xmark1 = document.createElement("div")
            xmark1.className = "marker xmark1"
            cells.appendChild(xmark1)

            let xmark2 = document.createElement("div")
            xmark2.className = "marker xmark2"
            cells.appendChild(xmark2)
        } else {
            cells.attributes.data.value = 1
            let omark = document.createElement("div")
            omark.className = "marker omark"
            cells.appendChild(omark)
        }
    }
    const updateArray = (x,y) => {
        // updates the array with the players move based on the turn boolean
        console.log(game1.turn)
        if (gameMode) {
            game1.turn ? game1.gameBoardArray[x][y] = "X" : game1.gameBoardArray[x][y] = "O"
        } else {
            game1.gameBoardArray[x][y] = "X"
        }
        // } else {
        //     let moves = MinMaxAI()
        //     console.log(moves.row, moves.col)
        //     game1.gameBoardArray[moves.row][moves.col] = "O"
        //     let movesStr = moves.row + "" + moves.col;
        //     console.log(movesStr)
        //     makeSymbol(document.getElementById(`cell${movesStr}`))
        //     game1.turn = !game1.turn;
            
        // }
        // game1.turn ? game1.gameBoardArray[x][y] = "X" : game1.gameBoardArray[x][y] = "O"
        // console.log("test",MinMaxAI())
    }
    const circleWinCells = (pos1,pos2,pos3) => {
        document.getElementById(`cell${pos1}`).style.backgroundColor = "rgb(50, 210, 50)"
        document.getElementById(`cell${pos2}`).style.backgroundColor = "rgb(50, 210, 50)"
        document.getElementById(`cell${pos3}`).style.backgroundColor = "rgb(50, 210, 50)"
    }

    const checkWinCondition = () => {
        let arr = game1.gameBoardArray;
        let winner;
        console.log("arr",arr)
        console.log("gameBoardarr",game1.gameBoardArray)
        //checks for win conditions
        if (arr[1][0] ==  arr[1][1] && arr[1][1] == arr[1][2] && arr[1][1] != '_') {
                arr[1][0] == "X" ? winner = true : winner = false
                circleWinCells(10,11,12)
        } else if 
        (arr[2][0] ==  arr[2][1] && arr[2][1] == arr[2][2] && arr[2][0] != '_') {
            arr[2][0] == "X" ? winner = true : winner = false
            circleWinCells(20,21,22)
        } else if
        (arr[3][0] ==  arr[3][1] && arr[3][1] == arr[3][2] && arr[3][0] != '_') {
            [3][0] == "X" ? winner = true : winner = false
             circleWinCells(30,31,32)
        } else if
        (arr[1][0] ==  arr[2][0] && arr[2][0] == arr[3][0] && arr[1][0] != '_') {
             arr[1][0] == "X" ? winner = true : winner = false
             circleWinCells(10,20,30)
        } else if
        (arr[1][1] ==  arr[2][1] && arr[2][1] == arr[3][1] && arr[1][1] != '_') {
            arr[1][1] == "X" ? winner = true : winner = false
            circleWinCells(11,21,31)
        } else if
        (arr[1][2] ==  arr[2][2] && arr[2][2] == arr[3][2] && arr[1][2] != '_') {
             arr[1][2] == "X" ? winner = true : winner = false
             circleWinCells(12,22,32)
        } else if
        (arr[1][0] ==  arr[2][1] && arr[2][1] == arr[3][2] && arr[1][0] != '_') {
             arr[1][0] == "X" ? winner = true : winner = false
             circleWinCells(10,21,32)
        } else if
        (arr[1][2] ==  arr[2][1] && arr[2][1] == arr[3][0] && arr[1][2] != '_') {
             arr[1][2] == "X" ? winner = true : winner = false
             circleWinCells(12,21,30)
        } else {
            counter++
            if (counter > 8) {
                winnerText.innerText = "Draw! No one wins!"
                playAgain.style.visibility = "unset"
                winnerText.style.visibility = "unset"
                cover.style.visibility = "unset"
            }
            return true
        }

        console.log("hit")
        if (winner) {
            winnerText.innerText = `We have a winner! The winner is ${player1.value}!`
        } else {
            winnerText.innerText = `We have a winner! The winner is  ${player2.value}!`
        }
        // displays winner information
        playAgain.style.visibility = "unset"
        winnerText.style.visibility = "unset"
        cover.style.visibility = "unset"
        sound4.play()
        return false

    }
    return {initializeGame, gameBoardArray, turn, classCell, players}

}

const game1 = gameBoard()
game1.initializeGame()


const h1para = document.querySelector("h1")

function nice() {
    document.querySelector("h1").style.color = "red"
}

h1para.addEventListener("click", nice)


// let cells = document.getElementById("cell3")
//     let xmark1 = document.createElement("div")
//     xmark1.style.cssText = "width: 50%; height: 50%; border: 1rem solid red; border-radius: 3rem; background-color: none; position: relative; top: 1.2rem; left: 1.2rem"
//     cells.appendChild(xmark1)

// classCell.forEach((cells) => {
//     cells.addEventListener("click", function addEvents() {
//         updateArray(cells.id[4]) // takes last char from string which is a number position

//         if (cells.attributes.data.value == 1) {
//             return
//         } else {
//             makeSymbol(cells)
//             game1.turn = !game1.turn;
//         }
//         checkWinCondition()
//     })
// })

console.log(!document.getElementById("player1").innerText)
console.log(game1.players())

