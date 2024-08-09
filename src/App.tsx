import { useState } from "react";
import GameBoard from "./components/GameBoard.tsx";
import Log from "./components/Log.tsx";
import Player from "./components/Player.tsx";

export type turnType = {
  square: { row: number; col: number };
  player: string;
};

function App() {
  // const [activePlayer, setActivePlayer] = useState<string>("X");
  const [gameTurns, setGameTurns] = useState<turnType[]>([]);

  function deriveActivePlayer(gameTurns: turnType[]) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X")
      currentPlayer = "O";

    return currentPlayer;
  }

  function onSelectSquare(rowIndex: number, colIndex: number) {
    // setActivePlayer((currentActivePlayer) =>
    //   currentActivePlayer === "X" ? "O" : "X",
    // );
    setGameTurns((prevTurns) => {
      const currentActivePlayer = deriveActivePlayer(prevTurns);

      const newTurn: turnType = {
        square: { row: rowIndex, col: colIndex },
        player: currentActivePlayer,
      };

      return [newTurn, ...prevTurns];
    });
  }

  const activePlayer = deriveActivePlayer(gameTurns);

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
        <GameBoard onSelectSquare={onSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
