'use client';

import React, { useState } from 'react';
import { useLawyer } from '../../../../hooks/lawyer/useLawyer';
import Overview from '../../../../components/Overview'; 
import Cases from '../../../../components/Cases'; 
import Certificates from '../../../../components/Certificates'; 
import { Lawyer, CUser } from '@/types'; // Import the Lawyer and CUser types

export default function Page({
  params,
}: {
  params: Promise<{ lawyerId: string }>;
}) {
  const { lawyerId } = React.use(params);
  const { lawyer, loading, error } = useLawyer(lawyerId);
  const [selectedTab, setSelectedTab] = useState('Overview');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lawyer) {
    return <div>No lawyer found.</div>;
  }

  // Construct the lawyer object with default values
  const lawyerProps: Lawyer = {
    id: lawyer.id,
    userId: lawyer.userId,
    avatar: lawyer.avatar || 'icons/profile.png', // Optional
    specialization: lawyer.specialization || 'N/A',
    bio: lawyer.bio || 'No bio available', // Optional
    phoneNumber: lawyer.phoneNumber || '', // Optional
    address: lawyer.address || '', // Optional
    experience: lawyer.experience || 'No experience listed', // Optional
    certificates: lawyer.certificates || [], // Optional
    rating: lawyer.rating || 0, // Optional
    user: {
      id: lawyer.user?.id || 'unknown', // Ensure this matches CUser structure
      email: lawyer.user?.email || 'unknown@example.com', // Ensure this matches CUser structure
      role: lawyer.user?.role || 'unknown', // Ensure this matches CUser structure
      username: lawyer.user?.username || 'Unknown User', // Include username as well
    },
    cases: lawyer.cases || [], // Optional
    caseRequests: lawyer.caseRequests || [], // Optional
    invoices: lawyer.invoices || [], // Optional
    payments: lawyer.payments || [], // Optional
    caseMemberships: lawyer.caseMemberships || [], // Optional
  };

  const renderContent = () => {
    if (selectedTab === 'Overview') {
      return <Overview lawyer={lawyerProps} />;
    } else if (selectedTab === 'Cases') {
      return <Cases lawyer={lawyerProps} />;
    } else if (selectedTab === 'Certifications') {
      return <Certificates lawyer={lawyerProps} />;
    } else {
      return <Overview lawyer={lawyerProps} />;
    }
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button className="mr-2 text-gray-600 hover:text-gray-800">&larr;</button>
          <h1 className="text-2xl font-bold">{lawyerProps.user.username}</h1>
        </div>
        <div className="text-gray-600 hover:text-gray-800 cursor-pointer">&#8230;</div>
      </div>

      {/* Profile Section */}
      <div className="relative bg-gray-200 p-6 rounded-md">
        <div className="flex">
        <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden">
  <img
    src={lawyerProps.avatar}
    alt="Lawyer Avatar"
    className="w-full h-full object-cover"
  />
</div>

          <div className="ml-6 flex flex-col justify-center">
            <div className="flex items-center mb-2">
              {/* Star Rating Logic */}
              {[...Array(5)].map((_, index) => {
                const isHalfStar = lawyerProps.rating && index < Math.floor(lawyerProps.rating) && index + 0.5 === lawyerProps.rating;
                return (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < (lawyerProps.rating || 0)
                        ? 'text-yellow-500'
                        : isHalfStar
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927a1 1 0 011.902 0l1.18 3.636a1 1 0 00.95.69h3.832a1 1 0 01.59 1.81l-3.1 2.254a1 1 0 00-.364 1.118l1.18 3.636a1 1 0 01-1.54 1.118L10 13.348l-3.1 2.254a1 1 0 01-1.54-1.118l1.18-3.636a1 1 0 00-.364-1.118L3.076 9.064a1 1 0 01.59-1.81h3.832a1 1 0 00.95-.69l1.18-3.637z" />
                  </svg>
                );
              })}
            </div>
            <p className="text-sm text-gray-500">{lawyerProps.rating ? `${lawyerProps.rating}/5` : 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">Connect</button>
        <button className="px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400">Chat</button>
      </div>

      {/* Tabs Section */}
      <div className="mt-6 border-b">
        <div className="flex space-x-4">
          {['Overview', 'Cases', 'Certifications'].map((tab) => (
            <button
              key={tab}
              className={`text-gray-600 pb-1 font-semibold ${
                selectedTab === tab ? 'border-b-2 border-orange-500 text-orange-500' : 'hover:text-blue-600'
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Render the appropriate content based on selected tab */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}