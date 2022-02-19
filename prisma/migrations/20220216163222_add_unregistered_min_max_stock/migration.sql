/*
  Warnings:

  - You are about to drop the column `maxStock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `minStock` on the `Product` table. All the data in the column will be lost.
  - Added the required column `blankMaxStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unregisteredMaxStock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `maxStock`,
    DROP COLUMN `minStock`,
    ADD COLUMN `blankMaxStock` INTEGER NOT NULL,
    ADD COLUMN `blankMinStock` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `unregisteredMaxStock` INTEGER NOT NULL,
    ADD COLUMN `unregisteredMinStock` INTEGER NOT NULL DEFAULT 0;
