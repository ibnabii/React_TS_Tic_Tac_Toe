import { useState } from "react";

type PlayerProps = {
  symbol: string;
};

export default function Player({ symbol }: PlayerProps) {
  const [name, setName] = useState<string>(" ");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
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
    <li>
      <span className="player">
        <span className="player-name">{isEditing ? editName : name}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
