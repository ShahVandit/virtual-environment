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
        if (username.trim()) { // Ensure that the username is not empty or just spaces
          onSubmit(username);
        }
      }}
      className="bg-blue-200 p-4 rounded-lg shadow" // Changed background color to light blue
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Enter your username:</span>
        </label>
        <div className="input-group">
          <input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            type="text"
            placeholder="Username"
            className="input input-bordered input-secondary flex-1"
          />
          <button type="submit" className="btn btn-primary ml-2">
            {submitText || 'Join'} {/* Fallback to 'Join' if submitText is not provided */}
          </button>
        </div>
      </div>
    </form>
  );
}
