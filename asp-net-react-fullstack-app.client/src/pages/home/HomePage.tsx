import React from "react";
import { cx } from "../../lib/utils";

const HomePage: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cx(" ", className)}>HomePage</div>;
};

export { HomePage };
