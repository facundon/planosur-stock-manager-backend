import { Strategy } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthService } from "./auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
      super()
   }

   async validate(user: string, password: string): Promise<true> {
      const didValidate = await this.authService.validateUser(user, password)
      if (!didValidate) throw new UnauthorizedException()
      return true
   }
}
