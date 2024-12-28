/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `DetallePago` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DetallePago" ADD COLUMN     "transactionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "DetallePago_transactionId_key" ON "DetallePago"("transactionId");
