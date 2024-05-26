import React, { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { SchoolType } from "../../../lib/types";
import { SchoolCourseCard } from "./SchoolCourseCard";
import { Route } from "../../../routes/schools";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SchoolsList: React.FC<{ className?: string; schools: SchoolType[] }> = ({
  className,
  schools,
}) => {
  const { search } = Route.useSearch();

  const filteredSchools = useMemo(() => {
    if (!search) return schools;
    return schools.filter((school) =>
      school.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {filteredSchools?.map((school) => (
        <Card key={school.id} className="p-2 border-b">
          <CardHeader>
            <h3 className="text-2xl">{school.name}</h3>
          </CardHeader>
          <CardContent>
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>See all courses</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <ul className="list-disc flex flex-col gap-2">
                        {school.courses.map((courseId) => (
                          <SchoolCourseCard
                            key={courseId}
                            courseId={courseId}
                          />
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { SchoolsList };
