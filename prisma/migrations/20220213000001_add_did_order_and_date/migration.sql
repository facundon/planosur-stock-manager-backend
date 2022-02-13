-- AlterTable
ALTER TABLE `Product` ADD COLUMN `didOrder` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `orderedAt` DATETIME(3) NULL;
