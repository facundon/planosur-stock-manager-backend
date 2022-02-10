import { Injectable } from "@nestjs/common"

@Injectable()
export class AuthService {
   async validateUser(pass: string): Promise<true | null> {
      const password = "123"
      if (password === pass) {
         return true
      }
      return null
   }
}
