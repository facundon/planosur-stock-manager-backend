import helmet from "helmet"
import { HttpAdapterHost, NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { PrismaClientExceptionFilter } from "src/db/prisma-client-exception.filter"
import { PrismaQueryInterceptorInterceptor } from "src/db/prisma-query-interceptor.interceptor"
import { AppModule } from "./app.module"

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule)
   app.disable("x-powered-by")
   app.use(helmet())
   app.enableCors({ origin: process.env.HOSTS, credentials: true })

   const { httpAdapter } = app.get(HttpAdapterHost)
   app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

   app.useGlobalInterceptors(new PrismaQueryInterceptorInterceptor())

   await app.listen(3001)
}
bootstrap()
