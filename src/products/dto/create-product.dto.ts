import { Decimal } from ".prisma/client/runtime"
import { Prisma, Unit } from "@prisma/client"
import { Transform } from "class-transformer"
import { IsDecimal, IsDefined, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateProductDto implements Prisma.ProductCreateInput {
   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsDefined()
   qty: number

   @IsOptional()
   @Transform(({ value }) => (value === "" ? null : parseInt(value)))
   @IsNumber()
   providerId: number

   @IsOptional()
   @IsNumber()
   @Transform(({ value }) => (value === "" ? null : parseInt(value)))
   categoryId: number

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsDefined()
   blankStock: number

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsDefined()
   blankMinStock = 0

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsDefined()
   blankMaxStock: number

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsDefined()
   unregisteredStock: number

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsDefined()
   unregisteredMinStock = 0

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsDefined()
   unregisteredMaxStock: number

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
