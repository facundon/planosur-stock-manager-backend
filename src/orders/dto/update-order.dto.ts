import { PartialType } from "@nestjs/mapped-types"
import { OrderStatus } from "@prisma/client"
import { IsEnum, IsNotEmpty } from "class-validator"
import { CreateOrderDto } from "src/orders/dto/create-order.dto"

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
   @IsEnum(OrderStatus)
   @IsNotEmpty()
   status: OrderStatus
}
