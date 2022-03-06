/*
  Warnings:

  - You are about to drop the column `qty` on the `ProductInOrder` table. All the data in the column will be lost.
  - Added the required column `blankQty` to the `ProductInOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unregisteredQty` to the `ProductInOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('fullfiled', 'pending', 'claim', 'canceled') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `ProductInOrder` DROP COLUMN `qty`,
    ADD COLUMN `blankQty` INTEGER NOT NULL,
    ADD COLUMN `unregisteredQty` INTEGER NOT NULL;
