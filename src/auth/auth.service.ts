import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
   constructor(private jwtService: JwtService) {}

   async validateUser(user: string, pass: string): Promise<true | null> {
      console.log(user, pass)
      const password = "123"
      if (password === pass) {
         return true
      }
      return null
   }

   async login(user: true): Promise<{ access_token: string }> {
      const payload = { username: user, sub: 1 }
      return {
         access_token: this.jwtService.sign(payload),
      }
   }
}
