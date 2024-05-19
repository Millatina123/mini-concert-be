/*
  Warnings:

  - You are about to drop the column `date` on the `concert` table. All the data in the column will be lost.
  - You are about to drop the column `tickets` on the `concert` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `payment` table. All the data in the column will be lost.
  - Added the required column `description` to the `Concert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Concert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Concert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Concert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_hours` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `concert` DROP COLUMN `date`,
    DROP COLUMN `tickets`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `logo` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `start_hours` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `amount`;
