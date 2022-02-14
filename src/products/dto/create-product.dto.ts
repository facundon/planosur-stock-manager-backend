import { Decimal } from ".prisma/client/runtime"
import { Prisma, Unit } from "@prisma/client"
import { Transform } from "class-transformer"
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateProductDto implements Prisma.ProductCreateInput {
   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsNotEmpty()
   qty: number

   @IsOptional()
   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   providerId: number

   @IsOptional()
   @IsNumber()
   @Transform(({ value }) => parseInt(value))
   categoryId: number

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsNotEmpty()
   currentStock: number

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   minStock = 0

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsNotEmpty()
   maxStock: number

   @IsNotEmpty()
   code: string

   @IsNotEmpty()
   name: string

   @IsNotEmpty()
   unit: Unit

   @IsNotEmpty()
   @IsDecimal()
   price: Decimal
}
