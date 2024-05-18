import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { api } from "../services/api";
import { TOKEN_KEY } from "../lib/constants";

type AuthType = {
  username: string;
  password: string;
};

const useAuth = () => {
  const [value, setValue, removeValue] = useLocalStorage(TOKEN_KEY, null);
  const [error, setError] = useState<string>();

  const login = async ({ username, password }: AuthType) => {
    await api({
      endpoint: "Auth/login",
      config: {
        method: "POST",
        data: {
          username,
          password,
        },
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setValue(res.data.token);
          setError(undefined);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError("Invalid username or password");
          return;
        }

        if (err.response.status !== 200) {
          setError("Something went wrong");
          return;
        }
      });
  };

  const logout = () => {
    removeValue();
  };

  const register = ({ password, username }: AuthType) => {
    api({
      endpoint: "Auth/register",
      config: {
        method: "POST",
        data: {
          username,
          password,
        },
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setValue(res.data.token);
          setError(undefined);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setError("User already exists");
          return;
        }

        if (err.response.status !== 200) {
          setError("Something went wrong");
          return;
        }
      });
  };

  const isAuth = Boolean(value);

  return {
    login,
    logout,
    register,
    error,
    isAuth,
  };
};

export default useAuth;