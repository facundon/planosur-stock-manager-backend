import { Injectable } from "@nestjs/common"
import { Config } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import * as bcrypt from "bcrypt"

@Injectable()
export class PasswordService {
   constructor(private prisma: PrismaService) {}

   async getPassword(): Promise<string> {
      let record: Config | null
      record = await this.prisma.config.findUnique({
         where: { key: "password" },
         rejectOnNotFound: false,
      })

      if (!record) {
         record = await this.createPassword()
      }

      return record.value
   }

   async updatePassword(newPassword: string): Promise<void> {
      await this.prisma.config.update({ where: { key: "password" }, data: { value: newPassword } })
   }

   private async createPassword(): Promise<Config> {
      const hash = await bcrypt.hash(process.env.DASHBOARD_DEFAULT_PW, 5)

      return await this.prisma.config.create({
         data: { key: "password", value: hash },
      })
   }
}
