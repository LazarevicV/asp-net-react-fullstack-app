import { QUERY_KEYS } from "@/lib/constants";
import { getRoadmaps } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RoadmapList } from "./components/RoadmapList";

const RoadmapsPage: React.FC<{ className?: string }> = ({ className }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.ROADMAPS],
    queryFn: getRoadmaps,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={cn(" ", className)}>
      <RoadmapList roadmaps={data || []} />
    </div>
  );
};

export { RoadmapsPage };
