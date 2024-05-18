import React, { useMemo } from "react";
import { cx } from "../../../lib/utils";
import { SchoolType } from "../../../lib/types";
import { SchoolCourseCard } from "./SchoolCourseCard";
import { Route } from "../../../routes/schools";

const SchoolsList: React.FC<{ className?: string; schools: SchoolType[] }> = ({
  className,
  schools,
}) => {
  const { search } = Route.useSearch();

  const filteredSchools = useMemo(() => {
    if (!search) return schools;
    return schools.filter((school) =>
      school.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className={cx(" ", className)}>
      {filteredSchools?.map((school) => (
        <div key={school.id} className="p-2 border-b">
          <h3>{school.name}</h3>
          <div>
            <p>courses:</p>

            <div className="flex flex-col gap-2">
              {school.courses.map((courseId) => (
                <ul key={courseId}>
                  <SchoolCourseCard courseId={courseId} />
                </ul>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { SchoolsList };
