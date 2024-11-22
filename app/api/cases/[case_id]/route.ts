// app/api/case/[case_id]/route.ts
import { NextResponse } from 'next/server';
import prisma from "../../../../prisma/prismaClient";

export async function GET(req: Request, { params }: { params: { case_id: string } }) {
const { case_id } = params;

try {
const caseData = await prisma.case.findUnique({
where: { id: case_id },
include: {
lawyer: true, // Include related lawyer data if needed
client: true, // Include related client data if needed
},
});

if (!caseData) {
  return NextResponse.json(
    { error: 'Case not found' },
    { status: 404 }
  );
}

return NextResponse.json(caseData);
} catch (error) {
console.error(error);
return NextResponse.json(
{ error: 'Failed to fetch case' },
{ status: 500 }
);
}
}