import { Module } from "@nestjs/common"
import { PrismaModule } from "src/prisma/prisma.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProductsModule } from "./products/products.module"
import { ProviderModule } from "./providers/providers.module"
import { CategoriesModule } from "./categories/categories.module"
import { AuthModule } from "./auth/auth.module"
import { APP_GUARD } from "@nestjs/core"
import { JwtAuthGuard } from "src/auth/jwt-auth-guard"

@Module({
   imports: [ProductsModule, PrismaModule, ProviderModule, CategoriesModule, AuthModule],
   controllers: [AppController],
   providers: [
      AppService,
      {
         provide: APP_GUARD,
         useClass: JwtAuthGuard,
      },
   ],
})
export class AppModule {}
