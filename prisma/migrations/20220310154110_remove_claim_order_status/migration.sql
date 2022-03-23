/*
  Warnings:

  - The values [claim] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('fullfiled', 'pending', 'canceled') NOT NULL DEFAULT 'pending';
