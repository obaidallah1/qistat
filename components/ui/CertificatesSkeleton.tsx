// ui/CertificatesSkeleton.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you have a Skeleton component

const CertificatesSkeleton: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        <Skeleton className="h-6 w-1/4 mb-4" /> {/* Skeleton for title */}
      </h2>
      <ul className="mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
            <Skeleton className="h-5 w-1/2 mb-2" /> {/* Skeleton for certificate title */}
            <Skeleton className="h-4 w-3/4 mb-1" /> {/* Skeleton for issued by */}
            <Skeleton className="h-4 w-1/3 mb-1" /> {/* Skeleton for issued date */}
            <Skeleton className="h-4 w-1/3" /> {/* Skeleton for expiration date */}
            <Skeleton className="h-4 w-1/4 mt-2" /> {/* Skeleton for document link */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificatesSkeleton;