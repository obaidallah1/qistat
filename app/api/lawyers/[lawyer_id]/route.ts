import prisma from "../../../../prisma/prismaClient";
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: { params: { lawyer_id: string } }) {
  const { lawyer_id } = params;

  try {
    const lawyerData = await prisma.lawyer.findUnique({
      where: { id: lawyer_id },
      include: {
        user: true, 
        cases: true,
      },
    });

    if (!lawyerData) {
      return NextResponse.json(
        { error: 'Lawyer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(lawyerData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch lawyer' },
      { status: 500 }
    );
  }
}