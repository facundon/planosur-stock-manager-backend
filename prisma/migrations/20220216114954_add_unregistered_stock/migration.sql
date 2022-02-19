/*
  Warnings:

  - You are about to drop the column `currentStock` on the `Product` table. All the data in the column will be lost.
  - Added the required column `blankStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unregisteredStock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `currentStock`,
    ADD COLUMN `blankStock` INTEGER NOT NULL,
    ADD COLUMN `unregisteredStock` INTEGER NOT NULL;
