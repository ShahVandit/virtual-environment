import { useState } from "react";

type Props = {
  submitText: string;
  onSubmit: (username: string) => void;
};

export function UsernameInput({ submitText, onSubmit }: Props) {
  const [username, setUsername] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(username);
      }}
      style={{ backgroundColor: "rgb(257, 250, 0)" }} // Change the RGB values to your desired mixed color
    >
      <div className="form-control">
        <div className="input-group">
          <input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            type="text"
            placeholder="Username"
            className="input input-bordered input-secondary"
          />
          <button className="btn">Join</button>
        </div>
      </div>
    </form>
  );
}
