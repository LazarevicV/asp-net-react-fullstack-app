import React from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { CourseType } from "@/lib/types";
import { QUERY_KEYS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/routes/__root";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createCourse, getCoursesCategories, getSchools } from "@/lib/queries";

const AddCourseModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [createdCourse, setCreatedCourse] = React.useState<CourseType>({
    id: "",
    title: "",
    description: "",
    link: "",
    category: "",
    school: "",
    filePath: "",
  });

  const { mutateAsync } = useMutation({
    mutationFn: createCourse,
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
    setCreatedCourse((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleEditCategory = (category: string) => {
    setCreatedCourse((prev) => ({ ...prev, category }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCreatedCourse((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedCourse((prev) => ({ ...prev, link: e.target.value }));
  };

  const handleSchoolChange = (school: string) => {
    setCreatedCourse((prev) => ({ ...prev, school }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
  };

  const handleUpdate = () => {
    if (
      createdCourse.title === "" ||
      createdCourse.description === "" ||
      createdCourse.link === "" ||
      createdCourse.category === "" ||
      createdCourse.school === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    const mutate = mutateAsync(
      { ...createdCourse, file: file },
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
          <h3>Add Course</h3>
          <DialogDescription>
            <div className="flex flex-col gap-4 mt-10">
              <Label>
                Title
                <Input
                  onChange={handleTitleChange}
                  type="text"
                  value={createdCourse.title}
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
                    <SelectValue placeholder={"Select category"} />
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
                  value={createdCourse.description}
                  onChange={handleDescriptionChange}
                  className="h-[250px]"
                />
              </Label>
              <Label>
                Link
                <Input
                  onChange={handleLinkChange}
                  type="text"
                  value={createdCourse.link}
                />
              </Label>
              <div className="flex items-center gap-10">
                School
                <Select
                  onValueChange={handleSchoolChange}
                  disabled={isLoadingSchools}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Select school"} />
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

              <Label>
                File
                <Input onChange={handleFileChange} type="file" />
              </Label>

              <Button onClick={handleUpdate}>Create</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { AddCourseModal };
