import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you have a Skeleton component

const CasesSkeleton: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        <Skeleton className="h-6 w-1/4 mb-4" /> {/* Skeleton for title */}
      </h2>
      <ul className="mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="mb-2">
            <Skeleton className="h-5 w-1/2" /> {/* Skeleton for case name */}
          </li>
        ))}
      </ul>
      <div className="mt-6 p-4 border border-gray-300 rounded-md">
        <Skeleton className="h-6 w-1/4 mb-2" /> {/* Skeleton for case detail title */}
        <Skeleton className="h-4 w-1/3 mb-1" /> {/* Skeleton for status */}
        <Skeleton className="h-4 w-full" /> {/* Skeleton for description */}
      </div>
    </div>
  );
};

export default CasesSkeleton;