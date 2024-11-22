import React from 'react';
import { Lawyer } from '@/types';


interface CertificatesProps {
  lawyer: Lawyer;
}

const Certificates: React.FC<CertificatesProps> = ({ lawyer }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Certificates</h2>
      <ul className="mt-4">
        {lawyer.certificates?.map((certificate) => {
          // Convert issuedDate and expirationDate to Date objects
          const issuedDate = new Date(certificate.issuedDate);
          const expirationDate = certificate.expirationDate ? new Date(certificate.expirationDate) : null;

          return (
            <li key={certificate.id} className="mb-4 p-4 border border-gray-300 rounded-md">
              <h3 className="font-bold">{certificate.title}</h3>
              <p>Issued By: {certificate.issuedBy}</p>
              <p>Issued Date: {issuedDate.toLocaleDateString()}</p>
              {expirationDate && (
                <p>Expiration Date: {expirationDate.toLocaleDateString()}</p>
              )}
              {certificate.documentUrl && (
                <a href={certificate.documentUrl} className="text-blue-600 hover:underline">
                  View Document
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {!lawyer.certificates?.length && <p>No certificates available.</p>}
    </div>
  );
};

export default Certificates;