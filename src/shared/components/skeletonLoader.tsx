import { cn } from "@/lib/utils"

export function SkeletonLoader({ className = "", amount = 6 }) {
  return (
    <>
      {Array.from({ length: amount }, (_, i) => (
        <div key={i} className={cn("w-full h-48 bg-gray-200 rounded-md animate-pulse", className)}></div>
      ))}
    </>
  );
}
