-- DropForeignKey
ALTER TABLE `ProductInOrder` DROP FOREIGN KEY `ProductInOrder_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductInOrder` DROP FOREIGN KEY `ProductInOrder_productId_fkey`;

-- AddForeignKey
ALTER TABLE `ProductInOrder` ADD CONSTRAINT `ProductInOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductInOrder` ADD CONSTRAINT `ProductInOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
