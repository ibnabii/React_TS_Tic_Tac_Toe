import { useState } from "react";
import GameBoard from "./components/GameBoard.tsx";
import { GameOver } from "./components/GameOver.tsx";
import Log from "./components/Log.tsx";
import Player from "./components/Player.tsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.ts";

type playerType = "X" | "O" | null;

const initialGameBoard: playerType[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export type turnType = {
  square: { row: number; col: number };
  player: playerType;
};

type playersType = {
  X: string;
  O: string;
};

function App() {
  // const [activePlayer, setActivePlayer] = useState<string>("X");
  const [gameTurns, setGameTurns] = useState<turnType[]>([]);
  const [players, setPlayers] = useState<playersType>({
    X: "Player 1",
    O: "Player 2",
  });

  function deriveActivePlayer(gameTurns: turnType[]): "X" | "O" {
    let currentPlayer: "X" | "O" = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X")
      currentPlayer = "O";

    return currentPlayer;
  }

  function deriveWinner(gameBoard: playerType[][], players: playersType) {
    // check winning
    let winner: string | null = null;
    for (const combination of WINNING_COMBINATIONS) {
      const [first, second, third] = combination.map(
        (position) => gameBoard[position.row][position.column],
      );
      if (first && first === second && first === third) {
        winner = players[first];
      }
    }
    return winner;
  }

  function deriveGameboard(gameTurns: turnType[]) {
    const gameBoard = [...initialGameBoard].map((row) => [...row]);
    for (const turn of gameTurns) {
      gameBoard[turn.square.row][turn.square.col] = turn.player;
    }
    return gameBoard;
  }

  function onSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const currentActivePlayer = deriveActivePlayer(prevTurns);
      const newTurn: turnType = {
        square: { row: rowIndex, col: colIndex },
        player: currentActivePlayer,
      };

      return [newTurn, ...prevTurns];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: string, name: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  }

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol="X"
            initialName="Player 1"
            activePlayer={activePlayer}
            onSaveName={handlePlayerNameChange}
          />
          <Player
            symbol="O"
            initialName="Player 2"
            activePlayer={activePlayer}
            onSaveName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={onSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
