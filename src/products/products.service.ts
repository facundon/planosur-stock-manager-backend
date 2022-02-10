import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Prisma, Product } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class ProductsService {
   constructor(private prisma: PrismaService) {}

   create(newProduct: Prisma.ProductCreateInput): Promise<Product> {
      const createdProduct = this.prisma.product.create({ data: newProduct })
      return createdProduct
   }

   findAll(
      where?: Prisma.ProductWhereInput,
      orderBy?: Prisma.ProductOrderByWithRelationInput
   ): Promise<Product[]> {
      const products = this.prisma.product.findMany({ where, orderBy })
      return products
   }

   findOne(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<Product> {
      const product = this.prisma.product.findUnique({ where: uniqueInput })
      if (!product) throw new HttpException("Product cannot be found", HttpStatus.NO_CONTENT)
      return product
   }

   update(
      uniqueInput: Prisma.ProductWhereUniqueInput,
      updatedProduct: Prisma.ProductUpdateInput
   ): Promise<Product> {
      const newProduct = this.prisma.product.update({
         where: uniqueInput,
         data: updatedProduct,
      })
      return newProduct
   }

   remove(uniqueInput: Prisma.ProductWhereUniqueInput): Promise<Product> {
      const removedProduct = this.prisma.product.delete({ where: uniqueInput })
      return removedProduct
   }
}
