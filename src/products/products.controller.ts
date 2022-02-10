import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import { Prisma, Product } from "@prisma/client"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
   constructor(private readonly productService: ProductsService) {}

   @Post()
   create(@Body() newProduct: Product): Promise<Product> {
      return this.productService.create(newProduct)
   }

   @Get()
   findAll(
      @Query("provider") providerId?: string,
      @Query("category") categoryId?: string,
      @Query("price_max") priceMax?: string,
      @Query("price_min") priceMin?: string,
      @Query("search") searchVal?: string,
      @Query("stock_max") stockMax?: string,
      @Query("stock_min") stockMin?: string,
      @Query("limit") limit?: string
   ): Promise<Product[]> {
      const filtersArray: Prisma.Enumerable<Prisma.ProductWhereInput> = []
      categoryId && filtersArray.push({ categoryId: { equals: +categoryId } })
      providerId && filtersArray.push({ providerId: { equals: +providerId } })
      priceMax && filtersArray.push({ price: { lte: parseFloat(priceMax) } })
      priceMin && filtersArray.push({ price: { gte: parseFloat(priceMin) } })
      stockMax && filtersArray.push({ currentStock: { lte: +stockMax } })
      stockMin && filtersArray.push({ currentStock: { gte: +stockMin } })
      searchVal &&
         filtersArray.push({
            OR: [{ name: { contains: searchVal } }, { code: { contains: searchVal } }],
         })

      return this.productService.findAll({ AND: filtersArray }, { code: "asc" }, +limit)
   }

   @Get(":code")
   findOne(@Param("code") code: string): Promise<Product> {
      return this.productService.findOne({ code })
   }

   @Patch(":code")
   update(
      @Param("code") code: string,
      @Body() updatedProduct: Prisma.ProductUpdateInput
   ): Promise<Product> {
      return this.productService.update({ code }, updatedProduct)
   }

   @Delete(":code")
   remove(@Param("code") code: string): Promise<Product> {
      return this.productService.remove({ code })
   }
}
