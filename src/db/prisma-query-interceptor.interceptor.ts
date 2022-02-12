import {
   CallHandler,
   ExecutionContext,
   HttpException,
   HttpStatus,
   Injectable,
   NestInterceptor,
} from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { Response } from "express"
import { catchError, Observable } from "rxjs"

@Injectable()
export class PrismaQueryInterceptorInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
      return next.handle().pipe(
         catchError(err => {
            if (err instanceof Prisma.PrismaClientValidationError) {
               throw new HttpException(err.message.replace(/\n/gm, " "), HttpStatus.CONFLICT)
            }
            throw err
         })
      )
   }
}
