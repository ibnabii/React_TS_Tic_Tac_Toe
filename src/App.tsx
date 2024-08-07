import Player from "./components/Player.tsx";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player symbol="X" />
          <Player symbol="O" />
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  );
}

export default App;
