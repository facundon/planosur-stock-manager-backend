import helmet from "helmet"
import { HttpAdapterHost, NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { PrismaClientExceptionFilter } from "src/prisma-client-exception.filter"
import { PrismaQueryInterceptorInterceptor } from "src/prisma-query-interceptor.interceptor"
import { AppModule } from "./app.module"

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule)
   app.disable("x-powered-by")
   app.use(helmet())

   const { httpAdapter } = app.get(HttpAdapterHost)
   app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

   app.useGlobalInterceptors(new PrismaQueryInterceptorInterceptor())

   await app.listen(3001)
}
bootstrap()
