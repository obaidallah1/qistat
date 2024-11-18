import { useEffect, useState } from 'react';
import { Certificate } from '../../types'; // Adjust the import based on your types definition

export const useCertificate = (certificateId: string | undefined) => {
  const [certificateData, setCertificateData] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/certificates/${certificateId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch certificate');
        }
        const data: Certificate = await response.json();
        setCertificateData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  return { certificateData, loading, error };
};