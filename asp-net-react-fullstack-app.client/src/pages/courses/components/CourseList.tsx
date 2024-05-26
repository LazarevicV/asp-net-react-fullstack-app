import React, { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { CourseType } from "../../../lib/types";
import { CourseCard } from "./CourseCard";
import { Route } from "../../../routes/courses";

const CourseList: React.FC<{
  className?: string;
  courses: CourseType[];
}> = ({ className, courses }) => {
  const { search, filter } = Route.useSearch();

  const filteredCourses = useMemo(() => {
    //filter courses based on search and filter
    return courses.filter((course) => {
      if (
        search &&
        !course.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      if (filter === "All") return true;

      if (filter && course.category !== filter) {
        return false;
      }
      return true;
    });
  }, [search, filter]);

  if (filteredCourses.length === 0)
    return <div className="text-center w-full">No courses found</div>;

  return (
    <div className={cn("grid gap-4 grid-cols-1 ", className)}>
      {filteredCourses.map((course) => (
        <CourseCard course={course} />
      ))}
    </div>
  );
};

export { CourseList };
