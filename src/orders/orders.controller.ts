import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import { OrdersService } from "./orders.service"
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"
import { Prisma } from "@prisma/client"
import { generatePdf } from "src/orders/pdf"
import { sendEmail } from "src/utils/email"

@Controller("orders")
export class OrdersController {
   constructor(private readonly ordersService: OrdersService) {}

   @Post()
   async create(@Body() createOrderDto: CreateOrderDto) {
      const orderCreated = await this.ordersService.create(createOrderDto)

      const pdf = await generatePdf(orderCreated.productInOrder, orderCreated.id)
      if (orderCreated.provider.email)
         sendEmail({
            message: "Se adjunta pedido",
            subject: "Pedido",
            attachments: [{ content: pdf, filename: "Pedido.pdf", encoding: "base64" }],
            to: orderCreated.provider.email,
         })

      return this.ordersService.addFileUrl(pdf, orderCreated.id)
   }

   @Get()
   findAll(@Query("searchVal") searchVal?: string) {
      const filters: Prisma.Enumerable<Prisma.OrderWhereInput> = []
      searchVal &&
         filters.push({
            OR: [{ id: { equals: +searchVal } }, { provider: { name: { contains: searchVal } } }],
         })

      return this.ordersService.findAll({ AND: filters }, { id: "desc" }, 20)
   }

   @Get(":id")
   findOne(@Param("id") id: string) {
      return this.ordersService.findOne(+id)
   }

   @Patch(":id")
   update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
      return this.ordersService.update(+id, updateOrderDto)
   }

   @Delete(":id")
   remove(@Param("id") id: string) {
      return this.ordersService.remove(+id)
   }
}
