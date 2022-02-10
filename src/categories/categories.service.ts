import { Injectable } from "@nestjs/common"
import { Category, Prisma } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class CategoriesService {
   constructor(private prisma: PrismaService) {}

   create(createCategoryDto: Prisma.CategoryCreateInput): Promise<Category> {
      return this.prisma.category.create({ data: createCategoryDto })
   }

   findAll(
      where?: Prisma.CategoryWhereInput,
      orderBy?: Prisma.CategoryOrderByWithRelationInput
   ): Promise<Category[]> {
      return this.prisma.category.findMany({ where, orderBy })
   }

   findOne(id: number): Promise<Category> {
      return this.prisma.category.findUnique({ where: { id } })
   }

   update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput): Promise<Category> {
      return this.prisma.category.update({ where: { id }, data: updateCategoryDto })
   }

   async remove(id: number): Promise<Category> {
      const [deletedCategory] = await this.prisma.$transaction([
         this.prisma.category.update({
            where: { id },
            data: { products: { set: [] } },
         }),
         this.prisma.category.delete({ where: { id } }),
      ])
      return deletedCategory
   }
}
