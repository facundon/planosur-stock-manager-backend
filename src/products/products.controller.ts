import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import { Prisma, Product } from "@prisma/client"
import { CreateProductDto } from "src/products/dto/create-product.dto"
import { SaleDto, StockType } from "src/products/dto/sale.dto"
import { UpdateProductDto } from "src/products/dto/update-product.dto"
import { getBaseMessage, sendEmail } from "src/utils/email"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
   constructor(private readonly productService: ProductsService) {}

   @Post()
   create(@Body() newProduct: CreateProductDto): Promise<Product> {
      return this.productService.create(newProduct)
   }

   @Get("/simple")
   async findAllSimple(
      @Query("limit") limit?: string,
      @Query("searchVal") searchVal?: string,
      @Query("providerId") providerId?: string
   ) {
      const filtersArray: Prisma.Enumerable<Prisma.ProductWhereInput> = []
      searchVal &&
         filtersArray.push({
            OR: [{ name: { contains: searchVal } }, { code: { contains: searchVal } }],
         })
      providerId && filtersArray.push({ providerId: { equals: +providerId } })

      const products = await this.productService.findAllSimple(
         { AND: filtersArray },
         { code: "asc" },
         +limit
      )

      return products
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
      @Query("limit") limit?: string,
      @Query("didOrder") didOrder?: boolean,
      @Query("updatedAtFrom") updatedAtFrom?: string,
      @Query("updatedAtTo") updatedAtTo?: string,
      @Query("orderedAtFrom") orderedAtFrom?: string,
      @Query("orderedAtTo") orderedAtTo?: string,
      @Query("needStock") needStock?: boolean
   ): Promise<(Product & { category: { name: string }; provider: { name: string } })[]> {
      const filtersArray: Prisma.Enumerable<Prisma.ProductWhereInput> = []
      categoryId && filtersArray.push({ categoryId: { equals: +categoryId } })
      providerId && filtersArray.push({ providerId: { equals: +providerId } })
      priceMax && filtersArray.push({ price: { lte: parseFloat(priceMax) } })
      priceMin && filtersArray.push({ price: { gte: parseFloat(priceMin) } })
      blankStockMax && filtersArray.push({ blankStock: { lte: +blankStockMax } })
      blankStockMin && filtersArray.push({ blankStock: { gte: +blankStockMin } })
      didOrder && filtersArray.push({ didOrder: { equals: Boolean(didOrder) } })
      //TODO: fix prisma generating timestamps on UTC (when ready) https://github.com/prisma/prisma/issues/5051
      updatedAtFrom && filtersArray.push({ updatedAt: { gt: `${updatedAtFrom}T00:00:00.000Z` } })
      updatedAtTo && filtersArray.push({ updatedAt: { lt: `${updatedAtTo}T23:59:59.999Z` } })
      orderedAtFrom && filtersArray.push({ orderedAt: { gt: `${orderedAtFrom}T00:00:00.000Z` } })
      orderedAtTo && filtersArray.push({ orderedAt: { lt: `${orderedAtTo}T23:59:59.999Z` } })
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

      if (needStock) {
         return products.filter(
            product =>
               product.blankMaxStock < product.blankMinStock ||
               product.unregisteredStock < product.unregisteredMinStock
         )
      }

      return products
   }

   @Get(":code")
   findOne(
      @Param("code") code: string
   ): Promise<Product & { category: { name: string }; provider: { name: string } }> {
      return this.productService.findOne({ code })
   }

   @Patch(":code")
   update(@Param("code") code: string, @Body() updatedProduct: UpdateProductDto): Promise<Product> {
      return this.productService.update({ code }, updatedProduct)
   }

   @Delete(":code")
   remove(@Param("code") code: string): Promise<Product> {
      return this.productService.remove({ code })
   }

   @Post("/sale")
   async sale(@Body() sale: SaleDto) {
      const products = await Promise.all(
         sale.products.map(async ({ code, amount, type }) => {
            const stockType: keyof Product =
               type === StockType.blank ? "blankStock" : "unregisteredStock"

            return await this.productService.update(
               { code },
               { [stockType]: { decrement: amount } }
            )
         })
      )
      const alertProducts = products.filter(
         product =>
            product.blankMinStock > product.blankStock ||
            product.unregisteredMinStock > product.unregisteredStock
      )
      if (alertProducts.length) sendEmail(getBaseMessage(alertProducts))

      return products
   }
}
