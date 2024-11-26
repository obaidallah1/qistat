'use server'
import prismaClient from '@/prisma/prismaClient';
import { CUserSchema } from '@/schemas';
import { CUser } from '@prisma/client';

export const createUser = async (data: unknown): Promise<CUser> => {
  const parseResult = CUserSchema.safeParse(data);

  if (!parseResult.success) {
    throw new Error(JSON.stringify(parseResult.error.flatten()));
  }

  const validatedData = parseResult.data;

  const {
    caseMemberships = [],
    notifications = [],
    messagesSent = [],
    messageStatuses = [],
    chatRooms = [],
    paymentStatuses = [],
    Message = [],
    ...userData
  } = validatedData;

  const newUser = await prismaClient.cUser.create({
    data: {
      ...userData,
      dateJoined: new Date(),
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return newUser;
};
export const getUsers = async (): Promise<CUser[]> =>{
  try{
    const users = await prismaClient.cUser.findMany();
    return users;
  }catch(err){
    console.error("error fetching users", err);
    throw err;
  }
}
export const updateUser = async (id: string, data: unknown): Promise<CUser> => {
  const parseResult = CUserSchema.safeParse(data);

  if (!parseResult.success) {
    throw new Error(JSON.stringify(parseResult.error.flatten()));
  }

  const validatedData = parseResult.data;

  // Create an object to hold only the user-related fields
  const { caseMemberships, notifications, messagesSent, messageStatuses, chatRooms, paymentStatuses, Message, ...userData } = validatedData;

  const updatedUser = await prismaClient.cUser.update({
    where: { id },
    data: {
      ...userData, 
      updatedAt: new Date(), 
    },
  });

  return updatedUser;
};
export const deleteUser = async (id: string): Promise<CUser> => {
  const deletedUser = await prismaClient.cUser.delete({
    where: { id },
  });

  return deletedUser;
};