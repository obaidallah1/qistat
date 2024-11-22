import React from 'react';
import { Lawyer  } from '@/types';

// Update the OverviewProps to use the new types
interface OverviewProps {
  lawyer: Lawyer; // Use the Lawyer type directly
}

const Overview: React.FC<OverviewProps> = ({ lawyer }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Specialization</h2>
      <p>{lawyer.specialization || 'N/A'}</p>

      <h2 className="text-lg font-semibold mt-4">Experience</h2>
      <p>{lawyer.experience || 'N/A'}</p>

      <h2 className="text-lg font-semibold mt-4">Number of Certificates</h2>
      <p>{lawyer.certificates?.length || 'N/A'}</p>
      <h2 className="text-lg font-semibold mt-4">Number of Cases</h2>
      <p>{lawyer.cases?.length || 'N/A'}</p>

      <h2 className="text-lg font-semibold mt-4">Biography</h2>
      <p>{lawyer.bio || 'No biography available.'}</p>
    </div>
  );
};

export default Overview;