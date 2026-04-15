import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { BotSessionRepository } from "../../core/repositories/bot-session-repository"
import { BotSession } from "../../core/entities/bot-session"
import { BotSessionMapper } from "../../core/mappers/bot-session-mapper"

@Injectable()
export class PrismaBotSessionRepository implements BotSessionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<BotSession | null> {
    const raw = await this.prisma.botSession.findUnique({ where: { id } })
    if (!raw) return null
    return BotSessionMapper.toDomain(raw)
  }

  async findByPhone(phone: string): Promise<BotSession | null> {
    const raw = await this.prisma.botSession.findFirst({
      where: { phone },
      orderBy: { startedAt: "desc" },
    })
    if (!raw) return null
    return BotSessionMapper.toDomain(raw)
  }

  async findActiveByPhone(phone: string): Promise<BotSession | null> {
    const raw = await this.prisma.botSession.findFirst({
      where: { phone, status: "IN_PROGRESS" },
      orderBy: { startedAt: "desc" },
    })
    if (!raw) return null
    return BotSessionMapper.toDomain(raw)
  }

  async create(session: BotSession): Promise<void> {
    const data = BotSessionMapper.toPersistence(session)
    await this.prisma.botSession.create({ data })
  }

  async save(session: BotSession): Promise<void> {
    const data = BotSessionMapper.toPersistence(session)
    await this.prisma.botSession.update({
      where: { id: data.id },
      data,
    })
  }
}
