// prisma/seed.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.cUser.create({
    data: {
      email: 'john.doe@example.com',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      gender: 'MALE',
      role: 'CLIENT',
    },
  });

  const user2 = await prisma.cUser.create({
    data: {
      email: 'jane.smith@example.com',
      username: 'janesmith',
      firstName: 'Jane',
      lastName: 'Smith',
      age: 28,
      gender: 'FEMALE',
      role: 'LAWYER',
    },
  });

  // Create clients
  const client = await prisma.client.create({
    data: {
      userId: user1.id,
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown, USA',
    },
  });

  // Create lawyers
  const lawyer = await prisma.lawyer.create({
    data: {
      userId: user2.id,
      avatar: 'avatar_url.jpg',
      specialization: 'Family Law',
      bio: 'Experienced family lawyer specializing in custody and divorce cases.',
      phoneNumber: '098-765-4321',
      address: '456 Elm St, Anytown, USA',
      experience: '5 years',
    },
  });

  // Create certificates
  await prisma.certificate.createMany({
    data: [
      {
        lawyerId: lawyer.id,
        title: 'Certified Family Lawyer',
        issuedBy: 'State Bar Association',
        issuedDate: new Date('2020-01-15'),
        expirationDate: new Date('2025-01-15'),
        documentUrl: 'http://example.com/certificate1.pdf',
      },
      {
        lawyerId: lawyer.id,
        title: 'Advanced Legal Studies',
        issuedBy: 'Law School',
        issuedDate: new Date('2018-05-20'),
      },
    ],
  });

  // Create cases
  const case1 = await prisma.case.create({
    data: {
      caseName: 'Custody Battle',
      description: 'Custody battle over children.',
      lawyerId: lawyer.id,
      clientId: client.id,
      status: 'IN_PROGRESS',
      priority: 'HIGH',
    },
  });

  console.log({ user1, user2, client, lawyer, case1 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });