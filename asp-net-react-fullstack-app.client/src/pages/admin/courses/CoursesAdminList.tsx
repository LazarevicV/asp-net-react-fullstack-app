import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QUERY_KEYS } from "@/lib/constants";
import { deleteCourse, getCourses } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { queryClient } from "@/routes/__root";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { EditCourseModal } from "./EditCourseModal";
import { CourseType } from "@/lib/types";

const CoursesAdminList: React.FC<{ className?: string }> = ({ className }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: getCourses,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {data?.map((course) => <CourseCard key={course.id} course={course} />)}
    </div>
  );
};

const CourseCard = ({ course }: { course: CourseType }) => {
  const [open, setOpen] = React.useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: deleteCourse,
  });

  const handleDeleteCourse = (id: string) => {
    const mutate = mutateAsync(id, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.COURSES],
        });
      },
    });

    toast.promise(mutate, {
      loading: "Deleting...",
      success: "Course deleted",
      error: "Failed to delete course",
    });
  };

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };
  return (
    <>
      <Card key={course.id} className="flex justify-between">
        <CardHeader>
          <h3>{course.title}</h3>
        </CardHeader>
        <CardContent className="flex gap-2 mt-6">
          <Edit
            onClick={() => {
              setOpen(true);
            }}
            className="stroke-gray-500 cursor-pointer hover:stroke-gray-800"
          />
          <Trash
            className="stroke-red-500 cursor-pointer hover:stroke-red-800"
            onClick={() => {
              handleDeleteCourse(course.id);
            }}
          />
        </CardContent>
      </Card>
      <EditCourseModal course={course} open={open} onOpenChange={handleOpen} />
    </>
  );
};
export { CoursesAdminList };
