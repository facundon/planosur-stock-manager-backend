import {
   CallHandler,
   ExecutionContext,
   HttpException,
   HttpStatus,
   Injectable,
   NestInterceptor,
} from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { catchError, Observable } from "rxjs"

@Injectable()
export class PrismaQueryInterceptorInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
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
