// hooks/useLawyers.ts
import { useEffect, useState } from 'react';
import { Lawyer } from '../../types'

export const useLawyers = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/lawyer');
        if (!response.ok) {
          throw new Error('Failed to fetch lawyers');
        }
        const data: Lawyer[] = await response.json();
        setLawyers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  return { lawyers, loading, error };
};