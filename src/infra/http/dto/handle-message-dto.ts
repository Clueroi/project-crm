import { IsString, IsNotEmpty } from "class-validator"

export class HandleMessageDto {
  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  message: string
}
