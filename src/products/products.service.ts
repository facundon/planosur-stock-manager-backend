import { Injectable } from "@nestjs/common"
import { Prisma, Product } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class ProductsService {
   constructor(private prisma: PrismaService) {}

   async create(newProduct: Prisma.ProductCreateInput): Promise<
      Product & {
         provider: {
            name: string
         }
         category: {
            name: string
         }
      }
   > {
      const createdProduct = this.prisma.product.create({
         data: newProduct,
         include: { category: { select: { name: true } }, provider: { select: { name: true } } },
      })
      return createdProduct
   }

   async findAll(
      where?: Prisma.ProductWhereInput,
      orderBy?: Prisma.ProductOrderByWithRelationInput,
      limit?: number,
      simple?: boolean
   ): Promise<
      | (Product & {
           provider: {
              name: string
           }
           category: {
              name: string
           }
        })
      | { name: string; code: string }[]
   > {
      if (simple) {
         const products = this.prisma.product.findMany({
            where,
            orderBy,
            select: { name: true, code: true },
         })
         return products
      }

      const products = this.prisma.product.findMany({
         where,
         orderBy,
         take: limit || 50,
         include: {
            category: { select: { name: true } },
            provider: { select: { name: true } },
         },
      })
      return products
   }

   async findOne(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<
      Product & {
         provider: {
            name: string
         }
         category: {
            name: string
         }
      }
   > {
      const product = this.prisma.product.findUnique({
         where: uniqueInput,
         include: { category: { select: { name: true } }, provider: { select: { name: true } } },
      })
      return product
   }

   async update(
      uniqueInput: Prisma.ProductWhereUniqueInput,
      updatedProduct: Prisma.ProductUpdateInput
   ): Promise<
      Product & {
         provider: {
            name: string
         }
         category: {
            name: string
         }
      }
   > {
      const newProduct = this.prisma.product.update({
         where: uniqueInput,
         data: updatedProduct,
         include: { category: { select: { name: true } }, provider: { select: { name: true } } },
      })
      return newProduct
   }

   async remove(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<
      Product & {
         provider: {
            name: string
         }
         category: {
            name: string
         }
      }
   > {
      const removedProduct = this.prisma.product.delete({
         where: uniqueInput,
         include: { category: { select: { name: true } }, provider: { select: { name: true } } },
      })
      return removedProduct
   }
}
