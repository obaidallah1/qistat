// hooks/useLawyer.ts
import { useEffect, useState } from 'react';
import { Lawyer } from '../../types'

export const useLawyer = (lawyerId: string | undefined) => {
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLawyer = async () => {
      if (!lawyerId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/lawyer/${lawyerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lawyer');
        }
        const data: Lawyer = await response.json();
        setLawyer(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [lawyerId]);

  return { lawyer, loading, error };
};