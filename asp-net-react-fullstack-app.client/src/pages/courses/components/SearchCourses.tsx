import React from "react";
import { cx } from "../../../lib/utils";
import { api } from "../../../services/api";
import { QUERY_KEYS } from "../../../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../../routes/courses";

const getCoursesCategories = async (): Promise<string[]> => {
  const res = await api({ endpoint: "api/Courses/Categories" });
  return res.data;
};

const SearchCourses: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { search, filter } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.COURSES_CATEGORIES],
    queryFn: getCoursesCategories,
  });

  if (isError) return <div>Error</div>;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({
        search: e.target.value,
        filter: prev.filter,
      }),
    });
  };

  const handleFiler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      search: (prev) => ({
        search: prev.search,
        filter: e.target.value,
      }),
    });
  };

  const selectOptions = [...(data || []), "All"];
  return (
    <div className={cx("flex items-center gap-4", className)}>
      <input type="text" onChange={handleSearch} value={search} />
      <select
        defaultValue="All"
        disabled={isLoading}
        name="category"
        id="category"
        value={filter}
        onChange={handleFiler}
      >
        {selectOptions?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export { SearchCourses };
