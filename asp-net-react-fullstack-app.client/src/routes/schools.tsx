import { createFileRoute, redirect } from "@tanstack/react-router";
import { TOKEN_KEY } from "../lib/constants";
import { SchoolsPage } from "../pages/schools/SchoolsPage";

type SchoolsSearchType = {
  search: string;
};

export const Route = createFileRoute("/schools")({
  beforeLoad: async () => {
    const jwt = localStorage.getItem(TOKEN_KEY);

    if (!jwt) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: () => <SchoolsPage />,

  validateSearch: (search: Record<string, unknown>): SchoolsSearchType => {
    return {
      search: (search.search as string) || "",
    };
  },
});
