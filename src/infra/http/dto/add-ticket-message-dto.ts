import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator"

export class AddTicketMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsBoolean()
  @IsOptional()
  isInternal?: boolean

  @IsString()
  @IsNotEmpty()
  sender: string
}
