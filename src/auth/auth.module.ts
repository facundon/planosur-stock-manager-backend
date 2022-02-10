import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { jwtConstants } from "src/auth/constants"
import { JwtStrategy } from "src/auth/jwt.strategy"
import { LocalStrategy } from "src/auth/local.strategy"
import { AuthService } from "./auth.service"

@Module({
   imports: [
      PassportModule,
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: "60s" },
      }),
   ],
   providers: [AuthService, LocalStrategy, JwtStrategy],
   exports: [AuthService],
})
export class AuthModule {}
