import { type turnType } from "../App.tsx";

const initialGameBoard: (string | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

type GameBoardProps = {
  onSelectSquare: (row: number, col: number) => void;
  turns: turnType[];
};
export default function GameBoard({ turns, onSelectSquare }: GameBoardProps) {
  const gameBoard = initialGameBoard;

  for (const turn of turns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
