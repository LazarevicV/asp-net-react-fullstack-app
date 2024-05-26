import React from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account.
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
        <Button onClick={handleLogin} className="w-full">
          Sign in
        </Button>
        <p className="text-red-500 my-2">{error && <div>{error}</div>}</p>
      </CardFooter>
    </Card>
  );
};

export { LoginForm };
