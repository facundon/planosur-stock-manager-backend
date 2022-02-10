import { Controller, Post, UseGuards, Request } from "@nestjs/common"
import { Request as ExpressRequest } from "express"
import { LocalAuthGuard } from "src/auth/local-auth-guard"

@Controller()
export class AppController {
   @UseGuards(LocalAuthGuard)
   @Post("auth/login")
   async login(@Request() req: ExpressRequest) {
      return req.user
   }
}
