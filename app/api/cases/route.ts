// cases/route.ts
import { NextResponse } from 'next/server';
import prisma from "../../../prisma/prismaClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lawyerId = searchParams.get('lawyerId'); // Get the lawyerId from query parameters
  const clientId = searchParams.get('clientId'); // Get the clientId from query parameters

  try {
    const cases = await prisma.case.findMany({
      where: {
        OR: [
          { lawyer: { id: lawyerId ? lawyerId : undefined } }, // Filter by lawyer's ID
          { client: { id: clientId ? clientId : undefined } }  // Filter by client's ID
        ],
      },
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