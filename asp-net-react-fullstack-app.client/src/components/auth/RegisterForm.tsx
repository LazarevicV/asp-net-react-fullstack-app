import React from "react";
import { cx } from "../../lib/utils";
import useAuth from "../../hooks/useAuth";

const RegisterForm: React.FC<{ className?: string }> = ({ className }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { register, error } = useAuth();

  const handleRegister = async () => {
    await register({ username, password });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={cx("", className)}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <div>{error}</div>}

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export { RegisterForm };
