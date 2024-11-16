import { PrismaClient, UserRole, CaseStatus, CasePriority, CasePrivacy, CaseRequestSlot } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const clientUser = await prisma.cUser.create({
    data: {
      email: 'client@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CLIENT,
    },
  });

  const lawyerUser = await prisma.cUser.create({
    data: {
      email: 'lawyer@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: UserRole.LAWYER,
    },
  });

  const client = await prisma.client.create({
    data: {
      userId: clientUser.id,
      phoneNumber: '123-456-7890',
      address: '123 Client St, City, Country',
    },
  });

  const lawyer = await prisma.lawyer.create({
    data: {
      userId: lawyerUser.id,
      specialization: 'Criminal Law',
      bio: 'Experienced lawyer in criminal cases.',
      phoneNumber: '987-654-3210',
      address: '456 Lawyer Ave, City, Country',
    },
  });

  const caseData = await prisma.case.create({
    data: {
      caseName: 'Case 101',
      description: 'This is a description of the case.',
      status: CaseStatus.IN_PROGRESS,
      priority: CasePriority.HIGH,
      privacy: CasePrivacy.PRIVATE,
      lawyerId: lawyer.id,
      clientId: client.id,
    },
  });

  await prisma.caseMembership.create({
    data: {
      userId: lawyerUser.id,
      caseId: caseData.id,
      role: 'ADMIN',
    },
  });

  await prisma.caseRequest.create({
    data: {
      clientId: client.id,
      lawyerId: lawyer.id,
      requestDate: new Date(),
      status: 'PENDING',
      slot: CaseRequestSlot.AVAILABLE,
      pinned: false,
    },
  });

  await prisma.chatRoom.create({
    data: {
      caseId: caseData.id,
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
