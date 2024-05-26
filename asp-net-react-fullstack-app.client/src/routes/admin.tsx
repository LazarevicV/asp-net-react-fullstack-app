import { PageSection } from "@/components/PageSection";
import { USER_KEY } from "@/lib/constants";
import { AdminPage } from "@/pages/admin/AdminPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

// TODO: CHECK ROLE
export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (user.role !== "admin") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => (
    <PageSection>
      <AdminPage />
    </PageSection>
  ),
});
