import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PasswordService } from "src/password/password.service"
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
   constructor(private jwtService: JwtService, private passwordService: PasswordService) {}

   async validateUser(user: string, pass: string): Promise<true | null> {
      const password = await this.passwordService.getPassword()
      const match = await bcrypt.compare(pass, password)

      if (match) {
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
