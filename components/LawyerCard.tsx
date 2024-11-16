'use client'
import React from 'react';

const LawyerCard = ({
  image = '', 
  fullName = "John Doe",
  experience = "5 years of experience", 
  certificate = "Bachelor's in Computer Science", 
  bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris  Duis sagittis ipsum. Praesent mauris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.", 
  rating = 4,
}) => {
  return (
    <div className="relative mx-auto w-full max-w-4xl rounded-lg border p-4 shadow-lg" style={{ backgroundColor: '#D8DCDB' }}>
      <div className="absolute left-2 top-2">
        <button className="flex h-10 w-10 items-center justify-center" style={{ backgroundColor: '#E96F6F' }}>&times;</button>
      </div>
      <div className="absolute right-2 top-2">
        <button className="px-2 py-1 text-[#3E3636] hover:text-gray-600">&#x2026;</button>
      </div>

      <div className="mt-8 flex">
        <div className="w-2/5 border-r border-gray-700 pr-4">
          <div className="mx-auto mb-2 h-32 w-32 rounded-full bg-gray-400" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-400'}>&#9733;</span>
              ))}
            </div>
            <span className="text-sm text-[#3E3636]">{rating}/5</span>
          </div>
          <div className="mt-2 text-center">
            <p className="text-lg font-semibold text-[#3E3636]">{fullName}</p>
            <p className="text-sm text-[#3E3636]">{experience}</p>
            <p className="text-sm text-[#3E3636]">{certificate}</p>
          </div>

          <div className="mt-4 text-center">
            <button className="w-full rounded-full bg-[#6F6D6C] px-4 py-1 text-white hover:bg-gray-700">See More</button>
          </div>
        </div>
        <div className="w-3/5 pl-4">
          <p className="mb-4 text-[#3E3636]">{bio}</p>

          <div className="flex justify-end space-x-2">
            <button className="px-3 py-1 bg-[#6F6D6C] text-white rounded-full hover:bg-gray-700">Button 1</button>
            <button className="px-3 py-1 bg-[#6F6D6C] text-white rounded-full hover:bg-gray-700">Button 2</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
