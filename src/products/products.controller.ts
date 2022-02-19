import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   Query,
   ValidationPipe,
} from "@nestjs/common"
import { Prisma, Product } from "@prisma/client"
import { CreateProductDto } from "src/products/dto/create-product.dto"
import { UpdateProductDto } from "src/products/dto/update-product.dto"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
   constructor(private readonly productService: ProductsService) {}

   @Post()
   create(
      @Body(new ValidationPipe({ transform: true })) newProduct: CreateProductDto
   ): Promise<Product> {
      return this.productService.create(newProduct)
   }

   @Get()
   async findAll(
      @Query("providerId") providerId?: string,
      @Query("categoryId") categoryId?: string,
      @Query("priceMax") priceMax?: string,
      @Query("priceMin") priceMin?: string,
      @Query("searchVal") searchVal?: string,
      @Query("unregisteredStockMax") unregisteredStockMax?: string,
      @Query("unregisteredStockMin") unregisteredStockMin?: string,
      @Query("blankStockMax") blankStockMax?: string,
      @Query("blankStockMin") blankStockMin?: string,
      @Query("limit") limit?: string
   ): Promise<(Product & { category: { name: string }; provider: { name: string } })[]> {
      const filtersArray: Prisma.Enumerable<Prisma.ProductWhereInput> = []
      categoryId && filtersArray.push({ categoryId: { equals: +categoryId } })
      providerId && filtersArray.push({ providerId: { equals: +providerId } })
      priceMax && filtersArray.push({ price: { lte: parseFloat(priceMax) } })
      priceMin && filtersArray.push({ price: { gte: parseFloat(priceMin) } })
      blankStockMax && filtersArray.push({ blankStock: { lte: +blankStockMax } })
      blankStockMin && filtersArray.push({ blankStock: { gte: +blankStockMin } })
      unregisteredStockMax &&
         filtersArray.push({ unregisteredStock: { lte: +unregisteredStockMax } })
      unregisteredStockMin &&
         filtersArray.push({ unregisteredStock: { gte: +unregisteredStockMin } })
      searchVal &&
         filtersArray.push({
            OR: [{ name: { contains: searchVal } }, { code: { contains: searchVal } }],
         })
      const products = await this.productService.findAll(
         { AND: filtersArray },
         { code: "asc" },
         +limit
      )
      return products
   }

   @Get(":code")
   findOne(
      @Param("code") code: string
   ): Promise<Product & { category: { name: string }; provider: { name: string } }> {
      return this.productService.findOne({ code })
   }

   @Patch(":code")
   update(
      @Param("code") code: string,
      @Body(new ValidationPipe({ transform: true })) updatedProduct: UpdateProductDto
   ): Promise<Product> {
      return this.productService.update({ code }, updatedProduct)
   }

   @Delete(":code")
   remove(@Param("code") code: string): Promise<Product> {
      return this.productService.remove({ code })
   }
}
