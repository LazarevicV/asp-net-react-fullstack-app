import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QUERY_KEYS } from "@/lib/constants";
import { getCoursesCategories, getSchools, updateCourse } from "@/lib/queries";
import { CourseType } from "@/lib/types";
import { queryClient } from "@/routes/__root";
import { useMutation, useQuery } from "@tanstack/react-query";

import React from "react";
import { toast } from "sonner";

const EditCourseModal: React.FC<{
  open: boolean;
  course: CourseType;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange, course }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [updatedCourse, setUpdatedCourse] = React.useState<CourseType>(course);

  const { mutateAsync } = useMutation({
    mutationFn: updateCourse,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: [QUERY_KEYS.COURSES_CATEGORIES],
    queryFn: getCoursesCategories,
  });

  const { data: schools, isLoading: isLoadingSchools } = useQuery({
    queryKey: [QUERY_KEYS.SCHOOLS],
    queryFn: getSchools,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCourse((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleEditCategory = (category: string) => {
    setUpdatedCourse((prev) => ({ ...prev, category }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatedCourse((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCourse((prev) => ({ ...prev, link: e.target.value }));
  };

  const handleSchoolChange = (school: string) => {
    setUpdatedCourse((prev) => ({ ...prev, school }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
  };

  const handleUpdate = () => {
    if (
      updatedCourse.title === "" ||
      updatedCourse.description === "" ||
      updatedCourse.link === "" ||
      updatedCourse.category === "" ||
      updatedCourse.school === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    const mutate = mutateAsync(
      { ...updatedCourse, file: file },
      {
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.COURSES],
          });
        },
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );

    toast.promise(mutate, {
      loading: "Updating...",
      success: "Course updated",
      error: "Failed to update course",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[600px] overflow-scroll">
        <DialogHeader>
          <h3>Edit Course</h3>
          <DialogDescription>
            <p>Editing course: {course.title}</p>

            <div className="flex flex-col gap-4 mt-10">
              <Label>
                Title
                <Input
                  onChange={handleTitleChange}
                  type="text"
                  value={updatedCourse.title}
                />
              </Label>
              <div className="flex items-center gap-10 ">
                Category
                {/* <Input type="text" value={course.category} /> */}
                <Select
                  onValueChange={handleEditCategory}
                  disabled={isLoadingCategories}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={course.category} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Label>
                Description
                <Textarea
                  value={updatedCourse.description}
                  onChange={handleDescriptionChange}
                  className="h-[250px]"
                />
              </Label>
              <Label>
                Link
                <Input
                  onChange={handleLinkChange}
                  type="text"
                  value={updatedCourse.link}
                />
              </Label>
              <div className="flex items-center gap-10">
                School
                <Select
                  onValueChange={handleSchoolChange}
                  disabled={isLoadingSchools}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={course.school} />
                  </SelectTrigger>
                  <SelectContent>
                    {schools?.map((schools) => (
                      <SelectItem key={schools.id} value={schools.name}>
                        {schools.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {updatedCourse.filePath && (
                <div className="flex items-center justify-between">
                  Current file:{" "}
                  <img className="max-h-[150px]" src={updatedCourse.filePath} />
                </div>
              )}
              <Label>
                File
                <Input onChange={handleFileChange} type="file" />
              </Label>

              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { EditCourseModal };
