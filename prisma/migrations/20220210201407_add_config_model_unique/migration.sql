/*
  Warnings:

  - The primary key for the `Config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Config` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `Config` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Config` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`key`);

-- CreateIndex
CREATE UNIQUE INDEX `Config_key_key` ON `Config`(`key`);
