import React from "react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "../../../lib/utils";
import { api } from "../../../services/api";
import { CourseType } from "../../../lib/types";
import { QUERY_KEYS } from "../../../lib/constants";
import { Link } from "@tanstack/react-router";

const getCourse = async (courseId: string): Promise<CourseType> => {
  const res = await api({ endpoint: `api/Courses/${courseId}` });
  return res.data;
};

const RoadmapCourseCard: React.FC<{ className?: string; courseId: string }> = ({
  className,
  courseId,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.COURSE, courseId],
    queryFn: () => getCourse(courseId),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <li className={cn("underline pl-5", className)}>
      <Link
        to={"/courses"}
        search={{
          search: data?.title || "",
          filter: data?.category || "",
        }}
      >
        <span>{data?.title}</span>
      </Link>
    </li>
  );
};

export { RoadmapCourseCard };
