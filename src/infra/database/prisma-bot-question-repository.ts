import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { BotQuestionRepository } from "../../core/repositories/bot-question-repository"
import { BotQuestion } from "../../domain/bot/enterprise/entities/bot-question"
import { BotQuestionMapper } from "../../core/mappers/bot-question-mapper"

@Injectable()
export class PrismaBotQuestionRepository implements BotQuestionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<BotQuestion | null> {
    const raw = await this.prisma.botQuestion.findUnique({ where: { id } })
    if (!raw) return null
    return BotQuestionMapper.toDomain(raw)
  }

  async findByOrder(order: number): Promise<BotQuestion | null> {
    const raw = await this.prisma.botQuestion.findUnique({ where: { order } })
    if (!raw) return null
    return BotQuestionMapper.toDomain(raw)
  }

  async findMany(): Promise<BotQuestion[]> {
    const raws = await this.prisma.botQuestion.findMany({
      orderBy: { order: "asc" },
    })
    return raws.map(BotQuestionMapper.toDomain)
  }

  async count(): Promise<number> {
    return this.prisma.botQuestion.count()
  }

  async create(question: BotQuestion): Promise<void> {
    const data = BotQuestionMapper.toPersistence(question)
    await this.prisma.botQuestion.create({ data })
  }
}
