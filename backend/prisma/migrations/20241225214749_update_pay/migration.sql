/*
  Warnings:

  - You are about to drop the column `productoId` on the `Pago` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_productoId_fkey";

-- AlterTable
ALTER TABLE "Pago" DROP COLUMN "productoId";

-- CreateTable
CREATE TABLE "DetallePago" (
    "id" SERIAL NOT NULL,
    "pagoId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DetallePago_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetallePago" ADD CONSTRAINT "DetallePago_pagoId_fkey" FOREIGN KEY ("pagoId") REFERENCES "Pago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePago" ADD CONSTRAINT "DetallePago_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
