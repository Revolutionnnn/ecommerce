/*
  Warnings:

  - You are about to drop the column `transactionId` on the `DetallePago` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Pago` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DetallePago_transactionId_key";

-- AlterTable
ALTER TABLE "DetallePago" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "Pago" ADD COLUMN     "transactionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Pago_transactionId_key" ON "Pago"("transactionId");
