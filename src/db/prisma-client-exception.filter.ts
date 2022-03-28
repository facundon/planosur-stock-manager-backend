import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"
import { Prisma } from "@prisma/client"
import { Response } from "express"
import { PRISMA_ERROR_CODES } from "src/db/prisma-error-codes"

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
   catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()

      // Handle Prisma errors
      if (exception.code.startsWith("P")) {
         console.log(exception)
         response.status(HttpStatus.CONFLICT).json({
            code: HttpStatus.CONFLICT,
            message: PRISMA_ERROR_CODES[exception.code] || exception.message.replace(/\n/gm, " "),
         })
         return
      }

      super.catch(exception, host)
   }
}
