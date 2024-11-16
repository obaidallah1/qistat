// hooks/useCases.ts
import { useEffect, useState } from 'react';
import { Case } from '../../types'

export const useCases = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/case');
        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }
        const data: Case[] = await response.json();
        setCases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return { cases, loading, error };
};