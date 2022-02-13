import { Prisma } from "@prisma/client"
import { IsNotEmpty } from "class-validator"

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
   @IsNotEmpty()
   name: string

   products?: Prisma.ProductCreateNestedManyWithoutCategoryInput
}
