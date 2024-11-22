// hooks/useOffice.ts

import { useEffect, useState } from 'react';
import { Office } from '../../types'; 

export const useOffice = (officeId: string | undefined) => {
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffice = async () => {
      if (!officeId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/offices/${officeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch office');
        }
        const data: Office = await response.json();
        setOffice(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOffice();
  }, [officeId]);

  return { office, loading, error };
};