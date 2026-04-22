import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { TicketRepository } from "../../domain/ticket/application/repositories/ticket-repository"
import { Ticket } from "../../domain/ticket/enterprise/entities/ticket"
import { TicketMapper } from "../../core/mappers/ticket-mapper"

@Injectable()
export class PrismaTicketRepository extends TicketRepository {
  constructor(private prisma: PrismaService) {
    super()
  }

  async create(ticket: Ticket): Promise<void> {
    const data = TicketMapper.toPersistence(ticket)
    await this.prisma.ticket.create({ data })
  }

  async findById(id: string): Promise<Ticket | null> {
    const raw = await this.prisma.ticket.findUnique({ where: { id } })
    if (!raw) return null
    return TicketMapper.toDomain(raw)
  }

  async findMany(filters?: { status?: string; priority?: string }): Promise<Ticket[]> {
    const where: any = {}
    if (filters?.status) where.status = filters.status
    if (filters?.priority) where.priority = filters.priority

    const raws = await this.prisma.ticket.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
    return raws.map(TicketMapper.toDomain)
  }

  async save(ticket: Ticket): Promise<void> {
    const data = TicketMapper.toPersistence(ticket)
    await this.prisma.ticket.update({
      where: { id: data.id },
      data,
    })
  }
}
