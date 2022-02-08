import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { Product } from "@prisma/client"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
   constructor(private readonly productService: ProductsService) {}

   @Post()
   create(@Body() newProduct: Product): Promise<Product> {
      return this.productService.create(newProduct)
   }

   @Get()
   findAll(): Promise<Product[]> {
      return this.productService.findAll()
   }

   @Get(":code")
   findOne(@Param("code") code: string): Promise<Product> {
      return this.productService.findOne({ code })
   }

   @Patch(":code")
   update(@Param("code") code: string, @Body() updatedProduct: Product): Promise<Product> {
      return this.productService.update({ code }, updatedProduct)
   }

   @Delete(":code")
   remove(@Param("code") code: string): Promise<Product> {
      return this.productService.remove({ code })
   }
}
