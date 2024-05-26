import React, { useEffect } from "react";

import { LoginForm } from "../../components/auth/LoginForm";
import { cn } from "../../lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import useAuth from "../../hooks/useAuth";

const LoginPage: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate({ to: "/" });
    }
  }, [isAuth]);

  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col gap-4 justify-center items-center",
        className
      )}
    >
      <LoginForm />
      <span>
        Don't have an account?{" "}
        <Link to="/register" className="underline">
          Register
        </Link>
      </span>
    </div>
  );
};

export { LoginPage };
