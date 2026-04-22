import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { TicketMessageRepository } from "../../domain/ticket/application/repositories/ticket-message-repository"
import { TicketMessage } from "../../domain/ticket/enterprise/entities/ticket-message"
import { TicketMessageMapper } from "../../core/mappers/ticket-message-mapper"

@Injectable()
export class PrismaTicketMessageRepository extends TicketMessageRepository {
  constructor(private prisma: PrismaService) {
    super()
  }

  async create(message: TicketMessage): Promise<void> {
    const data = TicketMessageMapper.toPersistence(message)
    await this.prisma.ticketMessage.create({ data })
  }

  async findByTicketId(ticketId: string): Promise<TicketMessage[]> {
    const raws = await this.prisma.ticketMessage.findMany({
      where: { ticketId },
      orderBy: { createdAt: "asc" },
    })
    return raws.map(TicketMessageMapper.toDomain)
  }
}
