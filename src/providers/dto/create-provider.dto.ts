import { Prisma } from "@prisma/client"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsOptional } from "class-validator"
export class CreateProviderDto implements Prisma.ProviderCreateInput {
   @IsNotEmpty()
   name: string

   @IsOptional()
   @Transform(({ value }) => parseInt(value) || null)
   phone?: number

   @IsOptional()
   email?: string

   @IsOptional()
   address?: string

   products?: Prisma.ProductCreateNestedManyWithoutProviderInput
}
