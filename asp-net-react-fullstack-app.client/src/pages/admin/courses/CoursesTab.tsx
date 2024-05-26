import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CoursesAdminList } from "./CoursesAdminList";

const CoursesTab: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl">Courses</h1>
        <Button className="flex gap-2">
          Add Course
          <Plus />
        </Button>
      </div>
      <CoursesAdminList />
    </div>
  );
};

export { CoursesTab };
