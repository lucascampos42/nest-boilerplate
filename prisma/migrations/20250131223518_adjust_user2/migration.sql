/*
  Warnings:

  - You are about to drop the column `personId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `address` table. All the data in the column will be lost.
  - You are about to alter the column `complement` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.
  - You are about to drop the column `cpfIe` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `person` table. All the data in the column will be lost.
  - You are about to alter the column `cpfCnpj` on the `person` table. The data in that column could be lost. The data in that column will be cast from `VarChar(14)` to `VarChar(11)`.
  - A unique constraint covering the columns `[email]` on the table `person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `street` to the `address` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `person` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_personId_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "personId",
DROP COLUMN "place",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "street" VARCHAR(120) NOT NULL,
ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "complement" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "neighborhood" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "person" DROP COLUMN "cpfIe",
DROP COLUMN "type",
ADD COLUMN     "addressId" INTEGER,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fantasyName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cpfCnpj" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "phone1" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "phone2" SET DATA TYPE VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "person_email_key" ON "person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "person_addressId_key" ON "person"("addressId");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
