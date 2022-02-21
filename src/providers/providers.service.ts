import { Injectable } from "@nestjs/common"
import { Prisma, Provider } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class ProvidersService {
   constructor(private prisma: PrismaService) {}

   async create(createProviderDto: Prisma.ProviderCreateInput): Promise<Provider> {
      return this.prisma.provider.create({ data: createProviderDto })
   }

   async findAll(
      where?: Prisma.ProviderWhereInput,
      orderBy?: Prisma.ProviderOrderByWithRelationInput
   ): Promise<Provider[]> {
      return this.prisma.provider.findMany({ where, orderBy })
   }

   async findOne(id: number): Promise<Provider> {
      return this.prisma.provider.findUnique({ where: { id } })
   }

   async update(id: number, updateProviderDto: Prisma.ProviderUpdateInput): Promise<Provider> {
      return this.prisma.provider.update({ where: { id }, data: updateProviderDto })
   }

   async remove(id: number): Promise<Provider> {
      return this.prisma.provider.delete({ where: { id } })
   }
}
