import { cn } from "@/lib/utils";
import React from "react";

interface containerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: containerProps) {
  return (
    <div className={cn("max-w-[1300px] px-8 mx-auto", className)}>
      {children}
    </div>
  );
}
