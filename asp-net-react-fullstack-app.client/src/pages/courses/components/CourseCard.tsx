import React from "react";
import { cn } from "../../../lib/utils";
import { CourseType } from "../../../lib/types";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const CourseCard: React.FC<{ className?: string; course: CourseType }> = ({
  className,
  course,
}) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <h3 className="text-2xl">{course.title}</h3>
      </CardHeader>

      <CardContent>
        <CardDescription>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>See more details</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <p>{course.description}</p>
                <div className="ml-auto">
                  <Button variant="ghost" className="flex gap-2">
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Check course
                      <ExternalLink />
                    </a>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4">
          <p className="text-sm">School:</p>
          <Link
            to="/schools"
            className="text-sm"
            search={{
              search: course.school,
            }}
          >
            {course.school}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export { CourseCard };
