import React, { useEffect } from "react";

import { LoginForm } from "../../components/auth/LoginForm";
import { cx } from "../../lib/utils";
import { useNavigate } from "@tanstack/react-router";
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
    <div className={cx(" ", className)}>
      <LoginForm />
    </div>
  );
};

export { LoginPage };
