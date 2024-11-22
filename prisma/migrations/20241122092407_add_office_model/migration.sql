-- AlterTable
ALTER TABLE "Lawyer" ADD COLUMN     "officeId" UUID;

-- CreateTable
CREATE TABLE "Office" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "rating" DOUBLE PRECISION,
    "numberOfRatings" INTEGER,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Office_name_idx" ON "Office"("name");

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE SET NULL ON UPDATE CASCADE;
