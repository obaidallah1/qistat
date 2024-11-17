'use client'

import React from 'react';
import { useLawyer } from '../../../../hooks/lawyer/useLawyer';

export default function Page({
  params,
}: {
  params: Promise<{ lawyerId: string }>;
}) {
  const { lawyerId } = React.use(params);

  const { lawyer, loading, error } = useLawyer(lawyerId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lawyer) {
    return <div>No lawyer found.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {lawyer.user?.firstName} {lawyer.user?.lastName}
      </h1>
      <div className="flex">
        <div
          className="w-32 h-32 rounded-full mb-4"
          style={{
            backgroundImage: `url(${lawyer.avatar || ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="ml-4">
          <p><strong>Specialization:</strong> {lawyer.specialization}</p>
          <p><strong>Experience:</strong> {lawyer.experience || "N/A"}</p>
          <p><strong>Certificate:</strong> {lawyer.certificate || "N/A"}</p>
          <p><strong>Rating:</strong> {lawyer.rating ? `${lawyer.rating}/5` : "N/A"}</p>
          <p><strong>Phone:</strong> {lawyer.phoneNumber || "N/A"}</p>
          <p><strong>Address:</strong> {lawyer.address || "N/A"}</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Biography</h2>
        <p>{lawyer.bio || "No biography available."}</p>
      </div>
    </div>
  );
}