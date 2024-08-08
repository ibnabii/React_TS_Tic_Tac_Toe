import { useState } from "react";
import GameBoard from "./components/GameBoard.tsx";
import Player from "./components/Player.tsx";

function App() {
  const [activePlayer, setActivePlayer] = useState<string>("X");

  function toggleActivePlayer() {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X",
    );
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol="X"
            initialName="Player 1"
            activePlayer={activePlayer}
          />
          <Player
            symbol="O"
            initialName="Player 2"
            activePlayer={activePlayer}
          />
        </ol>
        <GameBoard
          activePlayer={activePlayer}
          togglePlayer={toggleActivePlayer}
        />
      </div>
      LOG
    </main>
  );
}

export default App;
