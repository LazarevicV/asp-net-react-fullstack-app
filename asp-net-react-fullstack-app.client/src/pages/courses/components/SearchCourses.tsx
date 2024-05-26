import React from "react";
import { cn } from "../../../lib/utils";
import { api } from "../../../services/api";
import { QUERY_KEYS } from "../../../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../../routes/courses";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const handleFiler = (value: string) => {
    navigate({
      search: (prev) => ({
        search: prev.search,
        filter: value,
      }),
    });
  };

  const selectOptions = [...(data || []), "All"];
  return (
    <div className={cn("flex items-center gap-4 max-w-3xl mx-auto", className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          type="text"
          onChange={handleSearch}
          value={search}
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>

      <Select disabled={isLoading} value={filter} onValueChange={handleFiler}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          {selectOptions?.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { SearchCourses };
