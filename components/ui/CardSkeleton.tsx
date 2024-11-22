import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex justify-center w-full max-w-4xl p-4 bg-neutral-100 rounded-lg shadow-lg">
      {/* Left Side: Profile Picture and Details */}
      <div className="w-2/5 border-r border-gray-300 pr-4 flex flex-col items-center bg-white p-4 rounded-lg">
        <Skeleton className="h-32 w-32 rounded-full bg-gray-200" /> {/* Profile Picture Skeleton */}
        
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Skeleton className="h-6 w-[150px] bg-gray-200" /> {/* Rating Skeleton */}
        </div>
        
        <div className="mt-2 text-center">
          <Skeleton className="h-6 w-[250px] bg-gray-200" /> {/* Specialization Skeleton */}
          <Skeleton className="h-5 w-[200px] bg-gray-200" /> {/* Experience Skeleton */}
          <Skeleton className="h-5 w-[200px] bg-gray-200" /> {/* Certificate Skeleton */}
        </div>
        
        <div className="mt-4 w-full">
          <Skeleton className="h-10 w-full rounded-full bg-gray-200" /> {/* See More Button Skeleton */}
        </div>
      </div>
      
      {/* Right Side: Biography and Action Buttons */}
      <div className="w-3/5 pl-4 flex flex-col justify-between bg-white p-4 rounded-lg">
        <div>
          <Skeleton className="h-20 w-full bg-gray-200" /> {/* Biography Skeleton */}
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Skeleton className="h-10 w-[120px] rounded-full bg-gray-200" /> {/* Connect Button Skeleton */}
          <Skeleton className="h-10 w-[120px] rounded-full bg-gray-200" /> {/* Chat Button Skeleton */}
        </div>
      </div>
    </div>
  );
}