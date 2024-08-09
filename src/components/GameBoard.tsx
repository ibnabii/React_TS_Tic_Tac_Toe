type GameBoardProps = {
  onSelectSquare: (row: number, col: number) => void;
  gameBoard: (string | null)[][];
};
export default function GameBoard({
  gameBoard,
  onSelectSquare,
}: GameBoardProps) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={!!playerSymbol}
                >
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
