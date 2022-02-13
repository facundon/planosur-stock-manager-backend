import { Prisma } from "@prisma/client"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateProviderDto implements Prisma.ProviderCreateInput {
   @IsNotEmpty()
   name: string

   @Transform(({ value }) => parseInt(value))
   phone?: number

   @IsEmail()
   email?: string

   address?: string

   products?: Prisma.ProductCreateNestedManyWithoutProviderInput
}
