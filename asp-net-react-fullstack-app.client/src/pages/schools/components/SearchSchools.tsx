import React from "react";
import { cx } from "../../../lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../../routes/schools";

const SearchSchools: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate({ from: Route.fullPath });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: () => ({
        search: e.target.value,
      }),
    });
  };

  return (
    <div className={cx(" ", className)}>
      <input type="text" placeholder="Search Schools" onChange={handleSearch} />
    </div>
  );
};

export { SearchSchools };
