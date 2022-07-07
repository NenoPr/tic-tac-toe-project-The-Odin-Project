
// Javascript program to compute evaluation function for
// Tic Tac Toe Game.

// Returns a value based on who is winning
// b[3][3] is the Tic-Tac-Toe board
function evaluate(b)
{

  // Checking for Rows for X or O victory.
  for (let row = 0; row < 3; row++)
  {
    if (b[row][0] == b[row][1] && b[row][1] == b[row][2])
    {
      if (b[row][0] == 'x')
        return +10;
      else if (b[row][0] == 'o')
        return -10;
    }
  }

  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col++)
  {
    if (b[0][col] == b[1][col] && b[1][col] == b[2][col])
    {
      if (b[0][col] == 'x')
        return +10;
      else if (b[0][col] == 'o')
        return -10;
    }
  }

  // Checking for Diagonals for X or O victory.
  if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
  {
    if (b[0][0] == 'x')
      return +10;
    else if (b[0][0] == 'o')
      return -10;
  }
  if (b[0][2] == b[1][1] && b[1][1] == b[2][0])
  {
    if (b[0][2] == 'x')
      return +10;
    else if (b[0][2] == 'o')
      return -10;
  }

  // Else if none of them have won then return 0
  return 0;
}

// Driver code
let board=[ [ 'x', 'o', 'o'],
            [ 'o', 'x', 'x'],
            [ 'x', 'x', 'o']];

let value = evaluate(board);
console.log("The value of this board is "+ value);

// This code is contributed by avanitrachhadiya2155

