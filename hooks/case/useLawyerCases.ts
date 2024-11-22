// hooks/useCases.ts
import { useEffect, useState } from 'react';
import { Case } from '../../types';

export const useCases = (userId?: string) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      if (!userId) return; // Exit if no user ID is provided
      setLoading(true);
      try {
        const response = await fetch(`/api/cases?lawyerId=${userId}`); // Fetch cases for the specific user
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
  }, [userId]); // Fetch cases when the userId changes

  return { cases, loading, error };
};