import { useState } from "react";
import GameBoard from "./components/GameBoard.tsx";
import Log from "./components/Log.tsx";
import Player from "./components/Player.tsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.ts";

const initialGameBoard: (string | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export type turnType = {
  square: { row: number; col: number };
  player: string;
};

function App() {
  // const [activePlayer, setActivePlayer] = useState<string>("X");
  const [gameTurns, setGameTurns] = useState<turnType[]>([]);
  const [hasWinner, setHasWinner] = useState<boolean>(false);

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

  const gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }

  // check winning
  let winner: string | null = null;
  for (const combination of WINNING_COMBINATIONS) {
    const [first, second, third] = combination.map(
      (position) => gameBoard[position.row][position.column],
    );
    if (first && first === second && first === third) {
      winner = first;
      // setHasWinner(true);
    }
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
        {winner && <p>You won {winner}!</p>}
        <GameBoard onSelectSquare={onSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
