'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

interface LawyerCardProps {
  lawyer: {
    id: string;
    avatar?: string;
    specialization?: string; // Make this optional
    bio?: string;
    phoneNumber?: string;
    address?: string;
    experience?: string;
    certificate?: string;
    rating?: number;
  };
  onClose: (lawyerId: string) => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onClose }) => {
  const router = useRouter(); // Initialize the router

  // Function to handle redirection to the lawyer profile
  const handleSeeMore = () => {
    router.push(`/lawyers/${lawyer.id}/profile`); // Redirect to the lawyer's profile page
  };

  return (
    <div className="flex justify-center w-full mb-4">
      <div className="relative w-full max-w-4xl rounded-lg border p-4 shadow-lg" style={{ backgroundColor: '#D8DCDB' }}>
        {/* Close Button */}
        <div className="absolute left-2 top-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E96F6F] text-white"
            onClick={() => onClose(lawyer.id)} // Pass lawyer ID to onClose
          >
            &times;
          </button>
        </div>
        
        <div className="absolute right-2 top-2">
          <button className="px-2 py-1 text-[#3E3636] hover:text-gray-600">&#x2026;</button>
        </div>

        <div className="mt-8 flex">
          {/* Left Side: Lawyer Details */}
          <div className="w-2/5 border-r border-gray-700 pr-4">
            <div 
              className="mx-auto mb-2 h-32 w-32 rounded-full bg-gray-400" 
              style={{ backgroundImage: `url(${lawyer.avatar || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < (lawyer.rating || 0) ? 'text-yellow-500' : 'text-gray-400'}>&#9733;</span>
                ))}
              </div>
              <span className="text-sm text-[#3E3636]">{lawyer.rating || 0}/5</span>
            </div>
            <div className="mt-2 text-center">
              <p className="text-lg font-semibold text-[#3E3636]">{lawyer.specialization}</p>
              <p className="text-sm text-[#3E3636]">{lawyer.experience || "N/A"}</p>
              <p className="text-sm text-[#3E3636]">{lawyer.certificate || "N/A"}</p>
            </div>

            <div className="mt-4 text-center">
              <button 
                className="w-full rounded-full bg-[#6F6D6C] px-4 py-1 text-white hover:bg-gray-700" 
                onClick={handleSeeMore} // Attach the redirection function
              >
                See More
              </button>
            </div>
          </div>
          
          {/* Right Side: Biography and Buttons */}
          <div className="w-3/5 pl-4 flex flex-col justify-between">
            <div>
              <p className="mb-4 text-[#3E3636]">{lawyer.bio || "No biography available."}</p>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button className="px-3 py-1 bg-[#6F6D6C] text-white rounded-full hover:bg-gray-700">connect</button>
              <button className="px-3 py-1 bg-[#6F6D6C] text-white rounded-full hover:bg-gray-700">chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;