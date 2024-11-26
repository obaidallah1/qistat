'use server';

import prismaClient from '@/prisma/prismaClient';
import { LawyerSchema } from '@/schemas'; // Assume you have a LawyerSchema for validation
import { Lawyer } from '@prisma/client';

// Create a new lawyer
// Create a new lawyer
export const createLawyer = async (data: unknown): Promise<Lawyer> => {
    const parseResult = LawyerSchema.safeParse(data);
  
    if (!parseResult.success) {
      throw new Error(JSON.stringify(parseResult.error.flatten()));
    }
  
    const validatedData = parseResult.data;
  
    // Ensure that specialization and other required fields are included
    const { userId, specialization, experience, certificates = [], ...lawyerData } = validatedData;
  
    const newLawyer = await prismaClient.lawyer.create({
      data: {
        user: { connect: { id: userId } }, // Connect to the existing user
        specialization, // Include specialization
        experience,     // Include experience if it's optional
        rating: lawyerData.rating || null, // Include rating if it exists
      },
    });
  
    return newLawyer;
  };

// Get all lawyers
export const getLawyers = async (): Promise<Lawyer[]> => {
  try {
    const lawyers = await prismaClient.lawyer.findMany({
      include: {
        user: true,  // Include related user data if needed
      },
    });
    return lawyers;
  } catch (err) {
    console.error("Error fetching lawyers", err);
    throw err;
  }
};

// Update an existing lawyer
export const updateLawyer = async (id: string, data: unknown): Promise<Lawyer> => {
    const parseResult = LawyerSchema.safeParse(data);
  
    if (!parseResult.success) {
      throw new Error(JSON.stringify(parseResult.error.flatten()));
    }
  
    const validatedData = parseResult.data;
  
    // Destructure to get only the relevant fields for the lawyer
    const { userId, specialization, experience, rating, ...lawyerData } = validatedData;
  
    // Create an object to hold the update data
    const updateData: any = {
      ...lawyerData, // Include only the relevant lawyer fields
    };
  
    // Connect the user if userId is provided
    if (userId) {
      updateData.user = { connect: { id: userId } };
    }
  
    // Update the lawyer in the database
    const updatedLawyer = await prismaClient.lawyer.update({
      where: { id },
      data: updateData,
    });
  
    return updatedLawyer;
  };

// Delete a lawyer
export const deleteLawyer = async (id: string): Promise<Lawyer> => {
  const deletedLawyer = await prismaClient.lawyer.delete({
    where: { id },
  });

  return deletedLawyer;
};