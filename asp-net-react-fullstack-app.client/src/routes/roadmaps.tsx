import { PageSection } from "@/components/PageSection";
import { TOKEN_KEY } from "@/lib/constants";
import { RoadmapsPage } from "@/pages/roadmaps/RoadmapsPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/roadmaps")({
  beforeLoad: async () => {
    const jwt = localStorage.getItem(TOKEN_KEY);

    if (!jwt) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: () => (
    <PageSection>
      <RoadmapsPage />
    </PageSection>
  ),
});
