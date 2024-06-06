/*
  Warnings:

  - Added the required column `code` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `concert` ADD COLUMN `code` VARCHAR(191) NOT NULL;
