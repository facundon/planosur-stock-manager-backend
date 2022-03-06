import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"

@Injectable()
export class OrdersService {
   constructor(private prisma: PrismaService) {}

   async create(createOrderDto: CreateOrderDto) {
      const orderCreated = this.prisma.order.create({
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
            status: "pending",
         },
      })
      return orderCreated
   }

   async findAll() {
      const allOrders = this.prisma.order.findMany({
         include: { provider: { select: { name: true } } },
      })
      return allOrders
   }

   async findOne(id: number) {
      const singleOrder = this.prisma.order.findUnique({
         where: { id },
         include: { productInOrder: { include: { product: true } } },
      })
      return singleOrder
   }

   async update(id: number, updateOrderDto: UpdateOrderDto) {
      const updatedOrder = this.prisma.order.update({
         where: { id },
         data: {
            productInOrder: {
               updateMany: updateOrderDto.products.map(product => ({
                  where: { productId: product.code },
                  data: {
                     blankQty: product.blankQty,
                     unregisteredQty: product.unregisteredQty,
                  },
               })),
            },
            status: updateOrderDto.status,
         },
      })
      return updatedOrder
   }

   async remove(id: number) {
      return `This action removes a #${id} order`
   }
}
