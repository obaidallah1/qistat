// hooks/useClients.ts
import { useEffect, useState } from 'react';
import { Client } from '../../types'// Define your types in a types.ts file

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/client');
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const data: Client[] = await response.json();
        setClients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
};