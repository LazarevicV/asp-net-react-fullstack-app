import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../pages/home/HomePage";
import { PageSection } from "@/components/PageSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageSection>
      <HomePage />
    </PageSection>
  );
}
