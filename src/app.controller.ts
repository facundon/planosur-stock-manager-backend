import { Controller, Post, UseGuards, Request } from "@nestjs/common"
import { Request as ExpressRequest } from "express"
import { AuthService } from "src/auth/auth.service"
import { LocalAuthGuard } from "src/auth/local-auth-guard"
import { WithoutAuth } from "src/without-auth.decorator"

@Controller()
export class AppController {
   constructor(private authService: AuthService) {}

   @WithoutAuth()
   @UseGuards(LocalAuthGuard)
   @Post("auth/login")
   async login(@Request() req: ExpressRequest) {
      return this.authService.login(req.user as true)
   }
}
