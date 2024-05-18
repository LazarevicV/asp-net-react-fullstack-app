import React from "react";
import { cx } from "../../lib/utils";
import useAuth from "../../hooks/useAuth";

const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login, error } = useAuth();

  const handleLogin = async () => {
    await login({ username, password });
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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export { LoginForm };
