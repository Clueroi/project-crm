import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class WebhookN8nDto {
  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  @IsOptional()
  customerName?: string

  @IsString()
  @IsOptional()
  sessionId?: string
}
