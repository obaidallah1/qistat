import prisma from "../../../prisma/prismaClient";
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const lawyers = await prisma.lawyer.findMany({
      include: {
        user: true, 
        cases: true,
      },
    });
    return NextResponse.json(lawyers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch lawyers' },
      { status: 500 }
    );
  }
}