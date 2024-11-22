import React from 'react';
import { useCases } from '../hooks/case/useLawyerCases'; // Adjusted import to use the new hook
import { Lawyer } from '@/types';
import CasesSkeleton from './ui/CaseSkeleton'; // Import the skeleton component

interface CasesProps {
  lawyer: Lawyer;
}

const Cases: React.FC<CasesProps> = ({ lawyer }) => {
  const { cases, loading, error } = useCases(lawyer.id); 

  // Filter cases to show only those related to the lawyer
  const lawyerCases = cases.filter(caseItem => caseItem.lawyerId === lawyer.id);

  return (
    <div>
      <h2 className="text-lg font-semibold">Cases</h2>
      {loading && <CasesSkeleton />} {/* Show skeleton while loading */}
      {error && <p>Error: {error}</p>}
      <ul className="mt-4">
        {lawyerCases.length > 0 ? (
          lawyerCases.map((caseItem) => (
            <li key={caseItem.id} className="mb-2">
              <button
                className="text-blue-600 hover:underline"
              >
                {caseItem.caseName} {/* Updated to use caseName */}
              </button>
            </li>
          ))
        ) : (
          <p>No cases found for this lawyer.</p>
        )}
      </ul>

      {lawyerCases.length > 0 && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold">Case Details</h3>
          {/* Display case details here if needed */}
        </div>
      )}
    </div>
  );
};

export default Cases;