import { IsString, IsNotEmpty } from "class-validator"

export class CancelSessionDto {
  @IsString()
  @IsNotEmpty()
  phone: string
}
