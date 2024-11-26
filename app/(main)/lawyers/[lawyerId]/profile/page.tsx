'use client';

import React, { useState } from 'react';
import { useLawyer } from '../../../../../hooks/lawyer/useLawyer';
import Overview from '../../../../../components/Overview'; 
import Cases from '../../../../../components/Cases'; 
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Certificates from '../../../../../components/Certificates'; 
import { Lawyer } from '@/types'; // Import the Lawyer type
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Page({
  params,
}: {
  params: Promise<{ lawyerId: string }>; // Keep it as a Promise
}) {
  // Unwrap the params using React.use
  const { lawyerId } = React.use(params);
  const { lawyer, loading, error } = useLawyer(lawyerId);
  const [selectedTab, setSelectedTab] = useState('Overview');
  
  const router = useRouter();

  // Early return for loading and error states
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
    avatar: lawyer.avatar || 'icons/profile.png', 
    specialization: lawyer.specialization || 'N/A',
    bio: lawyer.bio || 'No bio available', 
    phoneNumber: lawyer.phoneNumber || '', 
    address: lawyer.address || '', 
    experience: lawyer.experience || 'No experience listed', 
    certificates: lawyer.certificates || [], 
    rating: lawyer.rating || 0, 
    user: {
      id: lawyer.user?.id || 'unknown',
      email: lawyer.user?.email || 'unknown@example.com',
      role: lawyer.user?.role || 'unknown',
      username: lawyer.user?.username || 'Unknown User',
      firstName:  lawyer.user?.firstName||'',
      middleName:  lawyer.user?.middleName ||'',
      lastName: lawyer.user?.lastName || ''
    },
    cases: lawyer.cases || [],
    caseRequests: lawyer.caseRequests || [],
    invoices: lawyer.invoices || [],
    payments: lawyer.payments || [],
    caseMemberships: lawyer.caseMemberships || [],
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return <Overview lawyer={lawyerProps} />;
      case 'Cases':
        return <Cases lawyer={lawyerProps} />;
      case 'Certifications':
        return <Certificates lawyer={lawyerProps} />;
      default:
        return <Overview lawyer={lawyerProps} />;
    }
  };

  const handleBack = () => {
    router.push(`/lawyers`); // Redirect to the lawyers page
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">{lawyerProps.user.username}</h1>
        </div>
        <div className="text-gray-600 hover:text-gray-800 cursor-pointer">&#8230;</div>
      </div>

      <div className="relative bg-gray-200 p-6 rounded-md">
        <div className="flex">
        <Avatar className="h-40 w-40"> 
    <AvatarImage src={lawyerProps.avatar} className="h-full w-full object-cover" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>

          <div className="ml-6 flex flex-col justify-center">
            <div className="flex items-center mb-2">
              {/* Star Rating Logic */}
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < (lawyerProps.rating || 0)
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927a1 1 0 011.902 0l1.18 3.636a1 1 0 00.95.69h3.832a1 1 0 01.59 1.81l-3.1 2.254a1 1 0 00-.364 1.118l1.18 3.636a1 1 0 01-1.54 1.118L10 13.348l-3.1 2.254a1 1 0 01-1.54-1.118l1.18-3.636a1 1 0 00-.364-1.118L3.076 9.064a1 1 0 01.59-1.81h3.832a1 1 0 00.95-.69l1.18-3.637z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-500">{lawyerProps.rating ? `${lawyerProps.rating}/5` : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">Connect</button>
        <button className="px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400">Chat</button>
      </div>

      <div className="mt-6 border-b">
        <div className="flex space-x-4">
          {['Overview', 'Cases', 'Certifications'].map((tab) => (
            <button
              key={tab}
              className={`text-gray-600 pb-1 font-semibold ${
                selectedTab === tab ? 'border-b-2 border-orange text-orange-500' : 'hover:text-blue-600'
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}