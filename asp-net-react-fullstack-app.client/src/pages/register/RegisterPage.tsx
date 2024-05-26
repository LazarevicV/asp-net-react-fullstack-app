import React, { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { cn } from "../../lib/utils";
import useAuth from "../../hooks/useAuth";
import { RegisterForm } from "../../components/auth/RegisterForm";

const RegisterPage: React.FC<{ className?: string }> = ({ className }) => {
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
        "h-screen w-full flex justify-center items-center flex-col gap-4",
        className
      )}
    >
      <RegisterForm />
      <span>
        Already have account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </span>
    </div>
  );
};

export { RegisterPage };
