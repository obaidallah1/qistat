'use client';
import React, { useEffect, useState } from 'react';
import LawyerCard from "../../components/LawyerCard";
import { useLawyers } from '../../hooks/lawyer/useLawyers';
import { Lawyer } from '../../types';

export default function Home() {
  const { lawyers, loading, error } = useLawyers(); 
  const [visibleLawyers, setVisibleLawyers] = useState<Lawyer[]>([]);

  useEffect(() => {
    if (lawyers && lawyers.length > 0) {
      setVisibleLawyers(lawyers);
    }
  }, [lawyers]);

  const handleClose = (lawyerId: string) => {
    setVisibleLawyers(prev => prev.filter(lawyer => lawyer.id !== lawyerId));
    console.log(`Lawyer card with ID ${lawyerId} closed`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <div className="grid grid-cols-1 gap-4 place-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {visibleLawyers.length > 0 ? (
          visibleLawyers.map(lawyer => (
            <LawyerCard 
              key={lawyer.id} 
              lawyer={lawyer} 
              onClose={() => handleClose(lawyer.id)} 
            />
          ))
        ) : (
          <div>No lawyers available</div>
        )}
      </div>
    </main>
  );
}