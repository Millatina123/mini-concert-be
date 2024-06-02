/*
  Warnings:

  - You are about to drop the column `transacation_code` on the `payment` table. All the data in the column will be lost.
  - Added the required column `transaction_code` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `transacation_code`,
    ADD COLUMN `transaction_code` VARCHAR(191) NOT NULL;
