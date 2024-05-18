import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      {" "}
      <QueryClientProvider client={queryClient}>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/courses" className="[&.active]:font-bold">
            Courses
          </Link>{" "}
          <Link to="/schools" className="[&.active]:font-bold">
            Schools
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </>
  ),
});
