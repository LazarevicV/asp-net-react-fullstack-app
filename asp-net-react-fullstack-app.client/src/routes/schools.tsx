import { createFileRoute, redirect } from "@tanstack/react-router";
import { TOKEN_KEY } from "../lib/constants";

export const Route = createFileRoute("/schools")({
  beforeLoad: async () => {
    const jwt = localStorage.getItem(TOKEN_KEY);

    if (!jwt) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: () => <div>Hello /schools!</div>,
});
