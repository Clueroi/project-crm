import { IsString, IsOptional, IsIn } from "class-validator"

export class ListTicketsDto {
  @IsString()
  @IsOptional()
  @IsIn(["PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED"])
  status?: string

  @IsString()
  @IsOptional()
  @IsIn(["LOW", "MEDIUM", "HIGH"])
  priority?: string
}
