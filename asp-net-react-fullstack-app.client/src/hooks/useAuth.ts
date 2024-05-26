import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { api } from "../services/api";
import { TOKEN_KEY, USER_KEY } from "../lib/constants";
import { useNavigate } from "@tanstack/react-router";

type AuthType = {
  username: string;
  password: string;
};

const useAuth = () => {

  const navigate = useNavigate();
  const [value, setValue, removeValue] = useLocalStorage(TOKEN_KEY, null);
  const [user, setUser, removeUser] = useLocalStorage<{username: string, role: string} | null>(USER_KEY, null);
  
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
      .then(async (res) => {
        if (res.status === 200) {

          setValue(res.data.token);


          await localVerify(res.data.token);
          setError(undefined);
          
        }
      })
      .catch((err) => {
        removeUser();
        removeValue();

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
    removeUser();

    navigate({
      to: "/",
    })
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
      .then(async(res) => {
        if (res.status === 200) {
          setValue(res.data.token);

          await localVerify(res.data.token);

          setError(undefined);
        }
      })
      .catch((err) => {
        removeUser();
        removeValue();
        
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


  const localVerify = async (token: string) => {
    await api({
      endpoint: "Auth/me",
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    })
      .then((res) => {
        if (res.status === 200) {
          
          setUser({
            username: res.data.username,
            role: res.data.role,
          })
        }
      })
      .catch(() => {
        removeUser();
        removeValue();
      });
  }

 
  const verify = async () => {
    if (!value) {
      return;
    }

    return await localVerify(value);
  };

  const isAuth = Boolean(value);

  return {
    login,
    user,
    logout,
    verify,
    register,
    error,
    isAuth,
  };
};

export default useAuth;
