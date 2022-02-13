import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from "@nestjs/common"
import { Provider } from "@prisma/client"
import { CreateProviderDto } from "src/providers/dto/create-provider.dto"
import { UpdateProviderDto } from "src/providers/dto/update-provider.dto"
import { ProvidersService } from "./providers.service"

@Controller("providers")
export class ProvidersController {
   constructor(private readonly providerService: ProvidersService) {}

   @Post()
   create(
      @Body(new ValidationPipe({ transform: true })) createProviderDto: CreateProviderDto
   ): Promise<Provider> {
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
      @Body(new ValidationPipe({ transform: true })) updateProviderDto: UpdateProviderDto
   ): Promise<Provider> {
      return this.providerService.update(+id, updateProviderDto)
   }

   @Delete(":id")
   remove(@Param("id") id: string): Promise<Provider> {
      return this.providerService.remove(+id)
   }
}
