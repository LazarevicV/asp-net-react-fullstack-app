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

export const getCoursesCategories = async (): Promise<string[]> => {
  const res = await api({ endpoint: "api/Courses/Categories" });
  return res.data;
};

export const updateCourse = async (course: CourseType & { file: File | null}, ) => {

  const { id, ...rest } = course;
  return await api({
    endpoint: `api/Courses/${id}`,
    config: {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        Title: rest.title,
        Description: rest.description,
        Link: rest.link,
        Category: rest.category,
        School: rest.school,
        File: rest.file,

      },
    },
  });
}

export const createCourse = async (course: CourseType & { file: File | null }) => {
  return await api({
    endpoint: `api/Courses`,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        Title: course.title,
        Description: course.description,
        Link: course.link,
        Category: course.category,
        School: course.school,
        File: course.file,
      },
    },
  });
};