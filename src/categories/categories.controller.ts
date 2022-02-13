import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from "@nestjs/common"
import { Category } from "@prisma/client"
import { CreateCategoryDto } from "src/categories/dto/create-category.dto"
import { UpdateCategoryDto } from "src/categories/dto/update-category.dto"
import { CategoriesService } from "./categories.service"

@Controller("categories")
export class CategoriesController {
   constructor(private readonly categoriesService: CategoriesService) {}

   @Post()
   create(
      @Body(new ValidationPipe({ transform: true })) createCategoryDto: CreateCategoryDto
   ): Promise<Category> {
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
      @Body(new ValidationPipe({ transform: true })) updateCategoryDto: UpdateCategoryDto
   ): Promise<Category> {
      return this.categoriesService.update(+id, updateCategoryDto)
   }

   @Delete(":id")
   remove(@Param("id") id: string): Promise<Category> {
      return this.categoriesService.remove(+id)
   }
}
