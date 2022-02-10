import { Module } from "@nestjs/common"
import { PrismaModule } from "src/prisma/prisma.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProductsModule } from "./products/products.module"
import { ProviderModule } from "./providers/providers.module"
import { CategoriesModule } from "./categories/categories.module"
import { AuthModule } from './auth/auth.module';

@Module({
   imports: [ProductsModule, PrismaModule, ProviderModule, CategoriesModule, AuthModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
