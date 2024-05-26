import React from "react";
import { cn } from "../../../lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../../routes/schools";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchSchools: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate({ from: Route.fullPath });

  const { search } = Route.useSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: () => ({
        search: e.target.value,
      }),
    });
  };

  return (
    <div className={cn("max-w-3xl mx-auto", className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search schools..."
          type="text"
          value={search}
          onChange={handleSearch}
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
    </div>
  );
};

export { SearchSchools };
