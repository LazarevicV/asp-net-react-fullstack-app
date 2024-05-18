import React from "react";
import { cx } from "../../../lib/utils";
import { CourseType } from "../../../lib/types";
import { Link } from "@tanstack/react-router";

const CourseCard: React.FC<{ className?: string; course: CourseType }> = ({
  className,
  course,
}) => {
  return (
    <div className={cx(" ", className)}>
      <h3 className="">{course.title}</h3>
      <p>{course.description}</p>
      <div className="flex gap-4">
        <p>School:</p>
        <Link
          to="/schools"
          search={{
            search: course.school,
          }}
        >
          {course.school}
        </Link>
      </div>
    </div>
  );
};

export { CourseCard };
