import prisma from "../../../../prisma/prismaClient";
import { NextResponse } from 'next/server';

// GET route to fetch a specific office by ID
export async function GET(req: Request, { params }: { params: { office_id: string } }) {
  const { office_id } = params;

  try {
    const officeData = await prisma.office.findUnique({
      where: { id: office_id },
      include: {
        lawyers: true, // Include associated lawyers
      },
    });

    if (!officeData) {
      return NextResponse.json(
        { error: 'Office not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(officeData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch office' },
      { status: 500 }
    );
  }
}