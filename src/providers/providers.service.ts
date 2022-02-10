import { Injectable } from "@nestjs/common"
import { Prisma, Provider } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class ProvidersService {
   constructor(private prisma: PrismaService) {}

   create(createProviderDto: Prisma.ProviderCreateInput): Promise<Provider> {
      return this.prisma.provider.create({ data: createProviderDto })
   }

   findAll(
      where?: Prisma.ProviderWhereInput,
      orderBy?: Prisma.ProviderOrderByWithRelationInput
   ): Promise<Provider[]> {
      return this.prisma.provider.findMany({ where, orderBy })
   }

   findOne(id: number): Promise<Provider> {
      return this.prisma.provider.findUnique({ where: { id } })
   }

   update(id: number, updateProviderDto: Prisma.ProviderUpdateInput): Promise<Provider> {
      return this.prisma.provider.update({ where: { id }, data: updateProviderDto })
   }

   remove(id: number): Promise<Provider> {
      return this.prisma.provider.delete({ where: { id } })
   }
}
