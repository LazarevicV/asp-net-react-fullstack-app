import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CourseType } from "@/lib/types";

import React from "react";

const EditCourseModal: React.FC<{
  open: boolean;
  course: CourseType;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange, course }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h3>Edit Course</h3>
          <DialogDescription>
            <p>Editing course: {course.title}</p>

            <form>
              <Label>
                Title
                <Input type="text" value={course.title} />
              </Label>
              <Label>
                Category
                <Input type="text" value={course.title} />
              </Label>

              <Label>
                Description
                <Input type="text" value={course.title} />
              </Label>
              <Label>
                Link
                <Input type="text" value={course.title} />
              </Label>
              <Label>
                School
                <Input type="text" value={course.title} />
              </Label>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { EditCourseModal };
