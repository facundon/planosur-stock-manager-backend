import { SetMetadata } from "@nestjs/common"

export const IS_PUBLIC_KEY = "without-auth"
export const WithoutAuth = () => SetMetadata(IS_PUBLIC_KEY, true)
