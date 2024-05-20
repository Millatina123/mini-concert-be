/*
  Warnings:

  - Added the required column `link_yt` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `concert` ADD COLUMN `link_yt` VARCHAR(191) NOT NULL;
