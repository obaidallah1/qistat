import React, { useState } from 'react';
import { useCase } from '../hooks/case/useCase';
import { Lawyer } from '@/types';


interface CasesProps {
  lawyer: Lawyer;
}

const Cases: React.FC<CasesProps> = ({ lawyer }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const { caseData, loading, error } = useCase(selectedCaseId || undefined); // Use the custom hook

  const handleCaseSelect = (id: string) => {
    setSelectedCaseId(id);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Cases</h2>
      <ul className="mt-4">
        {lawyer.cases?.map((caseItem) => (
          <li key={caseItem.id} className="mb-2">
            <button
              onClick={() => handleCaseSelect(caseItem.id)}
              className="text-blue-600 hover:underline"
            >
              {caseItem.caseName} {/* Updated to use caseName */}
            </button>
          </li>
        ))}
      </ul>

      {loading && <p>Loading case details...</p>}
      {error && <p>Error: {error}</p>}
      {caseData && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold">{caseData.caseName || 'Untitled Case'}</h3>
          <p>Status: {caseData.status || 'Unknown Status'}</p>
          <p>Description: {caseData.description || 'No description available.'}</p>
        </div>
      )}
    </div>
  );
};

export default Cases;