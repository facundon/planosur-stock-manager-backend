import { Module } from "@nestjs/common"
import { PrismaModule } from "src/prisma/prisma.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProductsModule } from "./products/products.module"

@Module({
   imports: [ProductsModule, PrismaModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
