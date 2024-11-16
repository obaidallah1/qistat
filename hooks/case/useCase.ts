// hooks/useCase.ts
import { useEffect, useState } from 'react';
import { Case } from '../../types'

export const useCase = (caseId: string | undefined) => {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      if (!caseId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/case/${caseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch case');
        }
        const data: Case = await response.json();
        setCaseData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId]);

  return { caseData, loading, error };
};