import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "src/auth/local.strategy"
import { AuthService } from "./auth.service"

@Module({
   imports: [PassportModule],
   providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
