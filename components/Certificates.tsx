import React from 'react';
import { Lawyer } from '@/types';
import CertificatesSkeleton from './ui/CertificatesSkeleton'; // Import the skeleton component
import { useCertificate } from '@/hooks/certificate/useCertificate'; // Import the hook for fetching individual certificates

interface CertificatesProps {
  lawyer: Lawyer;
}

const Certificates: React.FC<CertificatesProps> = ({ lawyer }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Certificates</h2>
      <ul className="mt-4">
        {lawyer.certificates?.length ? (
          lawyer.certificates.map((certificate) => {
            // Use the useCertificate hook to fetch each certificate individually
            const { certificateData, loading, error } = useCertificate(certificate.id);

            // Show loading skeleton for each certificate
            if (loading) {
              return <CertificatesSkeleton key={certificate.id} />;
            }

            // Handle error state
            if (error) {
              return <li key={certificate.id} className="mb-4 text-red-600">Error: {error}</li>;
            }

            // If certificateData is available, render it
            if (certificateData) {
              // Convert issuedDate and expirationDate to Date objects
              const issuedDate = new Date(certificateData.issuedDate);
              const expirationDate = certificateData.expirationDate ? new Date(certificateData.expirationDate) : null;

              return (
                <li key={certificateData.id} className="mb-4 p-4 border border-gray-300 rounded-md">
                  <h3 className="font-bold">{certificateData.title}</h3>
                  <p>Issued By: {certificateData.issuedBy}</p>
                  <p>Issued Date: {issuedDate.toLocaleDateString()}</p>
                  {expirationDate && (
                    <p>Expiration Date: {expirationDate.toLocaleDateString()}</p>
                  )}
                  {certificateData.documentUrl && (
                    <a href={certificateData.documentUrl} className="text-blue-600 hover:underline">
                      View Document
                    </a>
                  )}
                </li>
              );
            }

            return null; // In case none of the conditions match
          })
        ) : (
          <p>No certificates available.</p>
        )}
      </ul>
    </div>
  );
};

export default Certificates;