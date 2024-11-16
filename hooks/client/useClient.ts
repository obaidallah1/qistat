// hooks/useClient.ts
import { useEffect, useState } from 'react';
import { Client } from '../../types'

export const useClient = (clientId: string | undefined) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!clientId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/client/${clientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client');
        }
        const data: Client = await response.json();
        setClient(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  return { client, loading, error };
};