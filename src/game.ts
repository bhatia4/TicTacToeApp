export type Player = "X" | "O";
export type Cell = Player | null;
export type Mode = "single" | "two";
export type GameResult = Player | "tie" | null;

export const EMPTY_BOARD: Cell[] = Array(9).fill(null);

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export function getWinner(board: Cell[]): GameResult {
  for (const [first, second, third] of WINNING_LINES) {
    if (
      board[first] &&
      board[first] === board[second] &&
      board[first] === board[third]
    ) {
      return board[first];
    }
  }

  return board.every(Boolean) ? "tie" : null;
}

function minimax(board: Cell[], maximizing: boolean, depth: number): number {
  const result = getWinner(board);
  if (result === "O") return 10 - depth;
  if (result === "X") return depth - 10;
  if (result === "tie") return 0;

  const scores = board.reduce<number[]>((moves, cell, index) => {
    if (cell) return moves;
    const nextBoard = [...board];
    nextBoard[index] = maximizing ? "O" : "X";
    moves.push(minimax(nextBoard, !maximizing, depth + 1));
    return moves;
  }, []);

  return maximizing ? Math.max(...scores) : Math.min(...scores);
}

export function findComputerMove(board: Cell[]): number {
  let bestScore = Number.NEGATIVE_INFINITY;
  let bestMove = board.findIndex((cell) => cell === null);

  board.forEach((cell, index) => {
    if (cell) return;
    const nextBoard = [...board];
    nextBoard[index] = "O";
    const score = minimax(nextBoard, false, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  });

  return bestMove;
}
