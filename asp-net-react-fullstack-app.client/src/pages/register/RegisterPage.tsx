import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import { cx } from "../../lib/utils";
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
    <div className={cx(" ", className)}>
      <RegisterForm />
    </div>
  );
};

export { RegisterPage };
