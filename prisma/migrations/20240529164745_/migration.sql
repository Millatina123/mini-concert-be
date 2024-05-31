/*
  Warnings:

  - Added the required column `transacation_code` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `transacation_code` VARCHAR(191) NOT NULL;
