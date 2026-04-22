import { IsString, IsNotEmpty, IsOptional, IsIn } from "class-validator"

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsOptional()
  sessionId?: string

  @IsString()
  @IsOptional()
  @IsIn(["LOW", "MEDIUM", "HIGH"])
  priority?: string
}
