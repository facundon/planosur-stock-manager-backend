import { Transform, Type } from "class-transformer"
import { IsNumber, IsDefined, IsNotEmpty, IsEnum, ValidateNested } from "class-validator"

export enum StockType {
   "blank" = "blank",
   "unregistered" = "unregistered",
}

export class SaleProduct {
   @IsNotEmpty()
   code: string

   @Transform(({ value }) => parseInt(value))
   @IsNumber()
   @IsDefined()
   qty: number

   @IsEnum(StockType)
   type: StockType
}

export class SaleDto {
   @ValidateNested({ each: true })
   @Type(() => SaleProduct)
   products: SaleProduct[]
}
