import { PartialType } from "@nestjs/mapped-types"
import { CreateProviderDto } from "src/providers/dto/create-provider.dto"

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
