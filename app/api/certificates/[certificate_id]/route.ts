import { NextResponse } from 'next/server';
import prisma from "../../../../prisma/prismaClient"; // Adjust the path as necessary

export async function GET(req: Request, { params }: { params: { certificate_id: string } }) {
  const { certificate_id } = params;

  try {
    const certificateData = await prisma.certificate.findUnique({
      where: { id: certificate_id },
      include: {
        lawyer: true, // Include related lawyer data if needed
      },
    });

    if (!certificateData) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(certificateData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch certificate' },
      { status: 500 }
    );
  }
}