import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { Toaster } from "sonner";
import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

export const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <div className="flex w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
              <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Navigation />
              </nav>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Navigation />
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto">
                  <UserActions />
                </div>
              </div>
            </header>
          </div>
          <div className="">
            <div className="p-2 flex gap-2"></div>
            <Outlet />
          </div>
          <TanStackRouterDevtools />
        </QueryClientProvider>
        <Toaster richColors />
      </>
    );
  },
});

const Navigation = () => {
  const { user, isAuth } = useAuth();

  return (
    <>
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Courses App</span>
      </Link>
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      {isAuth && (
        <>
          <Link
            to="/courses"
            className="[&.active]:font-bold"
            search={{
              filter: "",
              search: "",
            }}
          >
            Courses
          </Link>{" "}
          <Link
            to="/schools"
            className="[&.active]:font-bold"
            search={{ search: "" }}
          >
            Schools
          </Link>
          <Link to="/roadmaps" className="[&.active]:font-bold">
            Roadmaps
          </Link>
        </>
      )}
      {user?.role === "admin" && (
        <Link to="/admin" className="[&.active]:font-bold">
          Admin
        </Link>
      )}
    </>
  );
};
const UserActions = () => {
  const { isAuth, logout, user } = useAuth();

  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="bg-yellow text-2xl">
        <button onClick={() => darkModeHandler()}>
          {dark && <IoSunny />}
          {!dark && <IoMoon />}
        </button>
      </div>
      {isAuth ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn-primary">
            Sign in
          </Link>
        </>
      )}
    </div>
  );
};
