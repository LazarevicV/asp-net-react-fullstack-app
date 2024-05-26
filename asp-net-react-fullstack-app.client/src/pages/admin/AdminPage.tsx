import React from "react";

import { cn } from "@/lib/utils";
import { CoursesTab } from "./courses/CoursesTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchoolsTab } from "./schools/SchoolsTab";

const AdminPage: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("w-full flex justify-center items-center", className)}>
      <Tabs defaultValue="schools" className="max-w-4xl w-full">
        <TabsList>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="schools">
          <SchoolsTab />
        </TabsContent>
        <TabsContent value="courses">
          <CoursesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { AdminPage };
