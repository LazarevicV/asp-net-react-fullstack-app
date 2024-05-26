import { cn } from "@/lib/utils";
import React from "react";

const PageSection = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{
    fullWidth?: boolean;
    className?: string;
    wider?: boolean;
    background?: boolean;
  }>
>(({ children, fullWidth, className, wider, background }, ref) => {
  const pageSectionClassName = cn(
    "mx-5",
    {
      "mx-0": !!fullWidth,
      "lg:mx-auto lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px]": !!wider,
      "lg:mx-auto lg:w-[944px] xl:w-[1136px] 2xl:w-[1328px]":
        !fullWidth && !wider,
      "px-[40px] lg:mx-auto lg:w-[984px] xl:w-[1176px] 2xl:w-[1368px] bg-orange-gradient":
        !!background,
    },
    className
  );
  return (
    <section ref={ref} className={pageSectionClassName}>
      {children}
    </section>
  );
});

PageSection.displayName = "PageSection";

export { PageSection };
