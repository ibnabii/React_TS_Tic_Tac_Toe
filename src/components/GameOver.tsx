type gameOverProps = {
  winner: string | null;
};
export function GameOver({ winner }: gameOverProps) {
  const gameOverMessage = winner ? winner + " won!" : "Draw!";

  return (
    <div id="game-over">
      <h2>Game over!</h2>
      <p>{gameOverMessage}</p>
      <p>
        <button>Rematch</button>
      </p>
    </div>
  );
}
