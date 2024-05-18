import React from "react";
import { cx } from "../../lib/utils";
import { CourseType } from "../../lib/types";
import { api } from "../../services/api";
import { QUERY_KEYS } from "../../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { CourseList } from "./components/CourseList";
import { SearchCourses } from "./components/SearchCourses";

const getCourses = async (): Promise<CourseType[]> => {
  const res = await api({ endpoint: "api/Courses" });
  return res.data;
};

const CoursesPage: React.FC<{ className?: string }> = ({ className }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: getCourses,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={cx(" ", className)}>
      <SearchCourses />
      <CourseList courses={data || []} />
    </div>
  );
};

export { CoursesPage };
