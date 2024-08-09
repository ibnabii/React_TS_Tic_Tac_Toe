import { type turnType } from "../App.tsx";

type logProps = {
  turns: turnType[];
};

export default function Log({ turns }: logProps) {
  return (
    <ol id="log">
      {turns.map((turn, idx) => (
        <p key={idx}>
          {turn.player} selected: ({turn.square.row}, {turn.square.col})
        </p>
      ))}
    </ol>
  );
}
