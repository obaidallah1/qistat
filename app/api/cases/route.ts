

import { NextResponse } from 'next/server';

import prisma from "../../../prisma/prismaClient";

export async function GET() {
  try {
    const cases = await prisma.case.findMany({
      include: {
        lawyer: true, // Include related lawyer data if needed
        client: true,  // Include related client data if needed
      },
    });
    return NextResponse.json(cases);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}
