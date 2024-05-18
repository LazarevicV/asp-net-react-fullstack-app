import { createFileRoute, redirect } from "@tanstack/react-router";
import { CoursesPage } from "../pages/courses/CoursesPage";
import { TOKEN_KEY } from "../lib/constants";

export const Route = createFileRoute("/courses")({
  beforeLoad: async () => {
    const jwt = localStorage.getItem(TOKEN_KEY);

    if (!jwt) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: () => <CoursesPage />,
});
