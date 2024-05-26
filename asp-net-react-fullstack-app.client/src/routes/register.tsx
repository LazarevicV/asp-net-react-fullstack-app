import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterPage } from "../pages/register/RegisterPage";
import { TOKEN_KEY } from "../lib/constants";
import { PageSection } from "@/components/PageSection";

export const Route = createFileRoute("/register")({
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
      <RegisterPage />
    </PageSection>
  ),
});
