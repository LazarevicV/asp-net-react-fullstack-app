import React from "react";
import { useQuery } from "@tanstack/react-query";

import { cx } from "../../lib/utils";
import { api } from "../../services/api";
import { SchoolType } from "../../lib/types";
import { QUERY_KEYS } from "../../lib/constants";
import { SchoolsList } from "./components/SchoolsList";
import { SearchSchools } from "./components/SearchSchools";

const getSchools = async (): Promise<SchoolType[]> => {
  const res = await api({ endpoint: "api/Schools" });
  return res.data;
};
const SchoolsPage: React.FC<{ className?: string }> = ({ className }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.SCHOOLS],
    queryFn: getSchools,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={cx(" ", className)}>
      <SearchSchools />
      <SchoolsList schools={data || []} />
    </div>
  );
};

export { SchoolsPage };
