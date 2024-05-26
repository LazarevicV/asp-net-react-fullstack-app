import React from "react";
import { cn } from "../../lib/utils";
import useAuth from "../../hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
    <>
      <Card className={cn("w-full max-w-sm", className)}>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your username below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={handleRegister} className="w-full">
            Register
          </Button>
          <p className="text-red-500 my-2">{error && <div>{error}</div>}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export { RegisterForm };
