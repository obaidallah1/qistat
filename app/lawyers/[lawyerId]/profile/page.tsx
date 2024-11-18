'use client'

import React, { useState } from 'react';
import { useLawyer } from '../../../../hooks/lawyer/useLawyer';
import Overview from '../../../../components/Overview'; // Import the Overview component
import Cases from '../../../../components/Cases'; // Import the Cases component
import Certificates from '../../../../components/Certificates'; // Import the Certificates component

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

  // Determine which component to render based on selectedTab
  const renderContent = () => {
    if (selectedTab === 'Overview') {
      return <Overview lawyer={lawyer} />;
    } else if (selectedTab === 'Cases') {
      return <Cases lawyer={lawyer} />;
    } else if (selectedTab === 'Certifications') {
      return <Certificates lawyer={lawyer} />;
    } else {
      return <Overview lawyer={lawyer} />; // Default to Overview if something unexpected happens
    }
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button className="mr-2 text-gray-600 hover:text-gray-800">&larr;</button>
          <h1 className="text-2xl font-bold">
            {lawyer.user?.username || `${lawyer.user?.firstName} ${lawyer.user?.lastName}`}
          </h1>
        </div>
        <div className="text-gray-600 hover:text-gray-800 cursor-pointer">&#8230;</div>
      </div>

      {/* Profile Section */}
      <div className="relative bg-gray-200 p-6 rounded-md">
        {/* Profile details omitted for brevity */}
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