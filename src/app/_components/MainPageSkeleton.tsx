import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MainPageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-20 h-9" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex">
          <Skeleton className="w-99 h-85 bg-white" />
        </div>
      ))}
    </div>
  );
};
