'use client';
import React, { useEffect, useState } from 'react';
import LawyerCard from "../../components/LawyerCard";
import { useLawyers } from '../../hooks/lawyer/useLawyers'; // Adjust the import path as necessary

export default function Home() {
  const { lawyers, loading, error } = useLawyers(); // Fetch all lawyers
  const [visibleLawyers, setVisibleLawyers] = useState([]);

  useEffect(() => {
    if ({lawyers}) {
      setVisibleLawyers(lawyers); // Set visible lawyers to the fetched data
    }
  }, [lawyers]);

  const handleClose = (lawyerId: string) => {
    // Filter out the closed lawyer from the visible list
    setVisibleLawyers(prev => prev.filter(lawyer => lawyer.id !== lawyerId));
    console.log(`Lawyer card with ID ${lawyerId} closed`);
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <div className="grid grid-cols-1 gap-4 place-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {visibleLawyers.length > 0 ? (
          visibleLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} onClose={() => handleClose(lawyer.id)} />
          ))
        ) : (
          <div>No lawyers available</div> // Display a message if no lawyers are visible
        )}
      </div>
    </main>
  );
}