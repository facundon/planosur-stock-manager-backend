import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Prisma, Product } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class ProductsService {
   constructor(private prisma: PrismaService) {}

   async create(newProduct: Prisma.ProductCreateInput): Promise<Product> {
      const createdProduct = await this.prisma.product.create({ data: newProduct })
      return createdProduct
   }

   async findAll(
      where?: Prisma.ProductWhereInput,
      orderBy?: Prisma.ProductOrderByWithRelationInput
   ): Promise<Product[]> {
      const products = await this.prisma.product.findMany({ where, orderBy })
      return products
   }

   async findOne(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<Product> {
      const product = await this.prisma.product.findUnique({ where: uniqueInput })
      if (!product) throw new HttpException("Product cannot be found", HttpStatus.NO_CONTENT)
      return product
   }

   async update(
      uniqueInput: Prisma.ProductWhereUniqueInput,
      updatedProduct: Prisma.ProductUpdateInput
   ): Promise<Product> {
      const newProduct = await this.prisma.product.update({
         where: uniqueInput,
         data: updatedProduct,
      })
      return newProduct
   }

   async remove(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<Product> {
      const removedProduct = await this.prisma.product.delete({ where: uniqueInput })
      return removedProduct
   }
}
