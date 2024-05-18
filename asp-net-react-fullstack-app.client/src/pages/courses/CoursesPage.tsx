import React from "react";
import { cx } from "../../lib/utils";

const CoursesPage: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cx(" ", className)}>CoursesPage</div>;
};

export { CoursesPage };
