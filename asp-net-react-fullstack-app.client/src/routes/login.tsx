import { createFileRoute, redirect } from "@tanstack/react-router";

import { TOKEN_KEY } from "../lib/constants";
import { LoginPage } from "../pages/login/LoginPage";
import { PageSection } from "@/components/PageSection";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const jwt = localStorage.getItem(TOKEN_KEY);

    if (jwt) {
      throw redirect({
        to: "/",
      });
    }
  },

  component: () => (
    <PageSection>
      <LoginPage />
    </PageSection>
  ),
});
