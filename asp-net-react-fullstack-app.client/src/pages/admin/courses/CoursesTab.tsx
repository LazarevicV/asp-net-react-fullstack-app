import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CoursesAdminList } from "./CoursesAdminList";
import { AddCourseModal } from "./AddCourseModal";

const CoursesTab: React.FC<{ className?: string }> = ({ className }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };
  return (
    <div className={cn("flex flex-col gap-4 mb-10", className)}>
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl">Courses</h1>
        <Button
          onClick={() => {
            handleOpen(true);
          }}
          className="flex gap-2"
        >
          Add Course
          <Plus />
        </Button>
      </div>
      <CoursesAdminList />
      <AddCourseModal open={open} onOpenChange={handleOpen} />
    </div>
  );
};

export { CoursesTab };
