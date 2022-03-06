import { Prisma } from "@prisma/client"
import { Transform, Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, ValidateNested } from "class-validator"

export class ProductInOrderDto
   implements Omit<Prisma.ProductInOrderCreateInput, "product" | "order">
{
   @IsDefined()
   code: string

   @Transform(({ value }) => parseInt(value))
   @IsNotEmpty()
   blankQty: number

   @Transform(({ value }) => parseInt(value))
   @IsNotEmpty()
   unregisteredQty: number
}

export class CreateOrderDto {
   @IsDefined()
   @Transform(({ value }) => parseInt(value))
   providerId: number

   @IsArray()
   @ArrayNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => ProductInOrderDto)
   products: ProductInOrderDto[]
}
