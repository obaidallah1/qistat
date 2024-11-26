/*
  Warnings:

  - You are about to drop the column `address` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Lawyer` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Lawyer` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `Lawyer` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Lawyer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CUser" ADD COLUMN     "address" TEXT,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "address",
DROP COLUMN "avatar",
DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "Lawyer" DROP COLUMN "address",
DROP COLUMN "avatar",
DROP COLUMN "bio",
DROP COLUMN "phoneNumber";
