import React from "react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "../../lib/utils";
import { QUERY_KEYS } from "../../lib/constants";
import { SchoolsList } from "./components/SchoolsList";
import { SearchSchools } from "./components/SearchSchools";
import { getSchools } from "@/lib/queries";

const SchoolsPage: React.FC<{ className?: string }> = ({ className }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.SCHOOLS],
    queryFn: getSchools,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={cn("max-w-4xl mx-auto flex flex-col gap-4", className)}>
      <SearchSchools />
      <SchoolsList schools={data || []} />
    </div>
  );
};

export { SchoolsPage };
