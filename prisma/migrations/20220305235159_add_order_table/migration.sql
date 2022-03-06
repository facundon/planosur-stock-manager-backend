-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `providerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('fullfiled', 'pending', 'claim', 'canceled') NOT NULL,
    `file` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductInOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `orderId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductInOrder` ADD CONSTRAINT `ProductInOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductInOrder` ADD CONSTRAINT `ProductInOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
