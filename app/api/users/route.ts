import { CUser } from "@/types";
import prisma from "../../../prisma/prismaClient";
import { NextResponse } from 'next/server';

type UserProps = {
    ClerkId : string ,
    fristname : string,
    username : string ,
    email : string,
}
  


export async function POST({ClerkId,username,fristname,email}:UserProps) {
  try {
    const user = await prisma.cUser.findFirst({
        where:{
            ClerkId: ClerkId
        }
    });
    const NewUser = await prisma.cUser.create({
     data:{
        username:username,
        email : email,

     }
    });
    if(user == null){
        NewUser
    }

    return NextResponse.json(NewUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch lawyers' },
      { status: 500 }
    );
  }
}