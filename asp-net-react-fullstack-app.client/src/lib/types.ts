
export type SchoolType = {
    id: string;
    name: string;
    courses: string[];
}

export type CourseType = {
    id: string;
    title: string;
    category: string;
    description: string;
    link: string;
    school: string;
}
