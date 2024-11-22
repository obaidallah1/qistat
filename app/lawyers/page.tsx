'use client';
import React, { useEffect, useState } from 'react';
import LawyerCard from "../../components/LawyerCard";
import { useLawyers } from '../../hooks/lawyer/useLawyers'; // Adjust the import path as necessary
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const { lawyers, loading, error } = useLawyers(); // Fetch all lawyers
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (lawyers.length > 0) {
      setCurrentIndex(0); // Reset to the first lawyer when the list changes
    }
  }, [lawyers]);

  const handleClose = (lawyerId: string) => {
    const updatedLawyers = lawyers.filter(lawyer => lawyer.id !== lawyerId);
    if (updatedLawyers.length === 0) {
      setCurrentIndex(0); // Reset index if no lawyers are left
    } else if (currentIndex >= updatedLawyers.length) {
      setCurrentIndex(updatedLawyers.length - 1);
    }
  };

  const handlePaginationClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalLawyers = lawyers.length;
  const totalPages = Math.ceil(totalLawyers); // Each page shows one lawyer

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {totalLawyers > 0 && (
          <LawyerCard
            key={lawyers[currentIndex].id}
            lawyer={lawyers[currentIndex]}
            onClose={() => handleClose(lawyers[currentIndex].id)}
          />
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  if (currentIndex > 0) {
                    handlePaginationClick(currentIndex - 1);
                  }
                }}
                className={currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index === currentIndex}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    handlePaginationClick(index);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  if (currentIndex < totalPages - 1) {
                    handlePaginationClick(currentIndex + 1);
                  }
                }}
                className={currentIndex === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}