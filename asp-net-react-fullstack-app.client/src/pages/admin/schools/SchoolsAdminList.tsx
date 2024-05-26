import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { QUERY_KEYS } from "@/lib/constants";
import { getSchools } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import React from "react";

const SchoolsAdminList: React.FC<{ className?: string }> = ({ className }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.SCHOOLS],
    queryFn: getSchools,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {data?.map((school) => (
        <Card key={school.id} className="flex justify-between">
          <CardHeader>
            <h3>{school.name}</h3>
          </CardHeader>
          <CardContent className="flex gap-2 mt-6">
            <Edit className="stroke-gray-500 cursor-pointer hover:stroke-gray-800" />
            <Trash className="stroke-red-500 cursor-pointer hover:stroke-red-800" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { SchoolsAdminList };
