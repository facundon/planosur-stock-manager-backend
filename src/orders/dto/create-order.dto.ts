import { Transform, Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsDefined, ValidateNested } from "class-validator"

export class ProductInOrderDto {
   @Transform(({ value }) => parseInt(value))
   code: string

   @Transform(({ value }) => parseInt(value))
   qty: number
}

export class CreateOrderDto {
   @IsDefined()
   providerId: number

   @IsArray()
   @ArrayNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => ProductInOrderDto)
   products: ProductInOrderDto[]
}
