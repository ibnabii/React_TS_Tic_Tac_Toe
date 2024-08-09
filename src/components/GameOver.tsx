type gameOverProps = {
  winner: string | null;
  onRestart: () => void;
};
export function GameOver({ winner, onRestart }: gameOverProps) {
  const gameOverMessage = winner ? winner + " won!" : "Draw!";

  return (
    <div id="game-over">
      <h2>Game over!</h2>
      <p>{gameOverMessage}</p>
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
