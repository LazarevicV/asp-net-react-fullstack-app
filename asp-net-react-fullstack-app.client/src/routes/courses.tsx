import { createFileRoute, redirect } from "@tanstack/react-router";
import { CoursesPage } from "../pages/courses/CoursesPage";
import { TOKEN_KEY } from "../lib/constants";
import { PageSection } from "@/components/PageSection";

type CoursesSearch = {
  search: string;
  filter: string;
};
export const Route = createFileRoute("/courses")({
  beforeLoad: async () => {
    const jwt = localStorage.getItem(TOKEN_KEY);

    if (!jwt) {
      throw redirect({
        to: "/login",
      });
    }
  },
  validateSearch: (search: Record<string, unknown>): CoursesSearch => {
    return {
      filter: (search.filter as string) || "",
      search: (search.search as string) || "",
    };
  },

  component: () => (
    <PageSection>
      <CoursesPage />
    </PageSection>
  ),
});
