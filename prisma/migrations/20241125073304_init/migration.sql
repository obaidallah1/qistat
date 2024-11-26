/*
  Warnings:

  - A unique constraint covering the columns `[ClerkId]` on the table `CUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ClerkId` to the `CUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CUser" ADD COLUMN     "ClerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CUser_ClerkId_key" ON "CUser"("ClerkId");
