import React from "react";
import { cn } from "../../../lib/utils";
import { Roadmap } from "../../../lib/types";
import { RoadmapCourseCard } from "./RoadmapCourseCard";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RoadmapList: React.FC<{ className?: string; roadmaps: Roadmap[] }> = ({
  className,
  roadmaps,
}) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {roadmaps?.map((roadmap) => (
        <Card key={roadmap.id} className="p-2 border-b">
          <CardHeader>
            <h3 className="text-2xl">{roadmap.name}</h3>

            <p className="opacity-80">{roadmap.description}</p>
          </CardHeader>
          <CardContent>
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>See roadmap</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <ul className="list-decimal flex flex-col gap-2">
                        {roadmap.courses.map((courseId, index) => (
                          <div
                            key={courseId}
                            className="flex items-center gap-2"
                          >
                            <p>{index + 1}</p>
                            <RoadmapCourseCard courseId={courseId} />
                          </div>
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

export { RoadmapList };
