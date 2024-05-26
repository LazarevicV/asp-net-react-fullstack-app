import { api } from "@/services/api";
import { CourseType, SchoolType } from "./types";

export const getCourses = async (): Promise<CourseType[]> => {
  const res = await api({ endpoint: "api/Courses" });
  return res.data;
};

export const getSchools = async (): Promise<SchoolType[]> => {
  const res = await api({ endpoint: "api/Schools" });
  return res.data;
};

export const deleteCourse = async (id: string) => {
  return await api({
    endpoint: `api/Courses/${id}`,
    config: {
      method: "DELETE",
    },
  });
};
