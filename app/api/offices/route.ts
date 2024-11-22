import prisma from "../../../prisma/prismaClient";
import { NextResponse } from 'next/server';

// GET route to fetch all offices
export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      include: {
        lawyers: true, // Include associated lawyers
      },
    });
    return NextResponse.json(offices);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch offices' },
      { status: 500 }
    );
  }
}