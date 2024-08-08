import { useState } from "react";

type PlayerProps = {
  initialName: string;
  symbol: string;
  activePlayer: string;
};

export default function Player({
  initialName,
  symbol,
  activePlayer,
}: PlayerProps) {
  const [name, setName] = useState<string>(initialName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  const editName = (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      type="text"
    />
  );

  return (
    <li className={activePlayer === symbol ? "active" : undefined}>
      <span className="player">
        <span className="player-name">{isEditing ? editName : name}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
