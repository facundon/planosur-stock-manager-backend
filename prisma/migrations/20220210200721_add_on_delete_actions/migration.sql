-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_providerId_fkey`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Provider`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
