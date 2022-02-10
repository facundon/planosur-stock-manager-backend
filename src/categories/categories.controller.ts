import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { Category, Prisma } from "@prisma/client"
import { CategoriesService } from "./categories.service"

@Controller("categories")
export class CategoriesController {
   constructor(private readonly categoriesService: CategoriesService) {}

   @Post()
   create(@Body() createCategoryDto: Prisma.CategoryCreateInput): Promise<Category> {
      return this.categoriesService.create(createCategoryDto)
   }

   @Get()
   findAll(): Promise<Category[]> {
      return this.categoriesService.findAll({}, { name: "asc" })
   }

   @Get(":id")
   findOne(@Param("id") id: string): Promise<Category> {
      return this.categoriesService.findOne(+id)
   }

   @Patch(":id")
   update(
      @Param("id") id: string,
      @Body() updateCategoryDto: Prisma.CategoryUpdateInput
   ): Promise<Category> {
      return this.categoriesService.update(+id, updateCategoryDto)
   }

   @Delete(":id")
   remove(@Param("id") id: string): Promise<Category> {
      return this.categoriesService.remove(+id)
   }
}
