import React from "react";
import { cn } from "../../lib/utils";
import { QUERY_KEYS } from "../../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { CourseList } from "./components/CourseList";
import { SearchCourses } from "./components/SearchCourses";
import { getCourses } from "@/lib/queries";

const CoursesPage: React.FC<{ className?: string }> = ({ className }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: getCourses,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={cn("max-w-4xl mx-auto flex flex-col gap-4", className)}>
      <SearchCourses />
      <CourseList courses={data || []} />
    </div>
  );
};

export { CoursesPage };
