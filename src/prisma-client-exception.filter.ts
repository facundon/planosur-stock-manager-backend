import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"
import { Prisma } from "@prisma/client"
import { Response } from "express"

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
   catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()

      // Handle Prisma errors
      if (exception.code.startsWith("P")) {
         response.status(HttpStatus.CONFLICT).json({
            code: HttpStatus.CONFLICT,
            message: exception.message.replace(/\n/gm, " "),
         })
         return
      }

      super.catch(exception, host)
   }
}
