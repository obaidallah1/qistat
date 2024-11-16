// hooks/usePayment.ts
import { useEffect, useState } from 'react';
import { Payment } from '../../types'

export const usePayment = (paymentId: string | undefined) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!paymentId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/payment/${paymentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payment');
        }
        const data: Payment = await response.json();
        setPayment(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  return { payment, loading, error };
};