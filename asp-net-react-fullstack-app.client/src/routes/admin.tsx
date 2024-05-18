import { createFileRoute } from "@tanstack/react-router";

// TODO: CHECK ROLE
export const Route = createFileRoute("/admin")({
  component: () => <div>Hello /admin!</div>,
});
