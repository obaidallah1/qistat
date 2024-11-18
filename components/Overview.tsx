import React from 'react';

// Define a type for the Certificate
interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  issuedDate: string;
}
interface Cases{
  id: string;
}
// Update the OverviewProps to use the new types
interface OverviewProps {
  lawyer: {
    specialization: string;
    experience?: string; // Optional
    certificates?: Certificate[]; // Optional array of Certificate
    cases?:Cases[];
    bio: string;
  };
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