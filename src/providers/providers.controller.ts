import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { Prisma, Provider } from "@prisma/client"
import { ProvidersService } from "./providers.service"

@Controller("providers")
export class ProvidersController {
   constructor(private readonly providerService: ProvidersService) {}

   @Post()
   create(@Body() createProviderDto: Prisma.ProviderCreateInput): Promise<Provider> {
      return this.providerService.create(createProviderDto)
   }

   @Get()
   findAll(): Promise<Provider[]> {
      return this.providerService.findAll({}, { name: "asc" })
   }

   @Get(":id")
   findOne(@Param("id") id: string): Promise<Provider> {
      return this.providerService.findOne(+id)
   }

   @Patch(":id")
   update(
      @Param("id") id: string,
      @Body() updateProviderDto: Prisma.ProviderUpdateInput
   ): Promise<Provider> {
      return this.providerService.update(+id, updateProviderDto)
   }

   @Delete(":id")
   remove(@Param("id") id: string): Promise<Provider> {
      return this.providerService.remove(+id)
   }
}
