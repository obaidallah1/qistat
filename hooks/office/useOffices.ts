// hooks/useOffices.ts

import { useEffect, useState } from 'react';
import { Office } from '../../types'; // Adjust the import path as necessary

export const useOffices = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffices = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/offices');
        if (!response.ok) {
          throw new Error('Failed to fetch offices');
        }
        const data: Office[] = await response.json();
        setOffices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  return { offices, loading, error };
};