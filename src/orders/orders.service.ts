import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"

@Injectable()
export class OrdersService {
   constructor(private prisma: PrismaService) {}

   async create(createOrderDto: CreateOrderDto) {
      const orderCreated = this.prisma.$transaction(async prisma => {
         Promise.all(
            createOrderDto.products.map(
               async ({ code }) =>
                  await prisma.product.update({ where: { code }, data: { didOrder: true } })
            )
         )

         return prisma.order.create({
            data: {
               productInOrder: {
                  createMany: {
                     data: createOrderDto.products.map(product => ({
                        productId: product.code,
                        blankQty: product.blankQty,
                        unregisteredQty: product.unregisteredQty,
                     })),
                  },
               },
               provider: { connect: { id: createOrderDto.providerId } },
               file: "aca va la url del pdf",
            },
            include: { provider: { select: { name: true } } },
         })
      })
      return orderCreated
   }

   async findAll(
      where?: Prisma.OrderWhereInput,
      orderBy?: Prisma.OrderOrderByWithRelationInput,
      limit?: number
   ) {
      const allOrders = this.prisma.order.findMany({
         include: { provider: { select: { name: true } } },
         where,
         orderBy,
         take: limit || 50,
      })
      return allOrders
   }

   async findOne(id: number) {
      const singleOrder = this.prisma.order.findUnique({
         where: { id },
         include: {
            productInOrder: { include: { product: true } },
            provider: { select: { name: true } },
         },
      })
      return singleOrder
   }

   async update(id: number, updateOrderDto: UpdateOrderDto) {
      const updatedOrder = this.prisma.$transaction(async prisma => {
         Promise.all(
            updateOrderDto.products.map(async product => {
               await prisma.product.update({
                  where: { code: product.code },
                  data: {
                     blankStock: { increment: product.blankQty },
                     unregisteredStock: { increment: product.unregisteredQty },
                     didOrder: false,
                  },
               })
            })
         )

         return prisma.order.delete({
            where: { id },
         })
      })

      return updatedOrder
   }

   async remove(id: number) {
      return `This action removes a #${id} order`
   }
}
