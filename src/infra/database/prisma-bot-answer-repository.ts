import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { BotAnswerRepository } from "../../core/repositories/bot-answer-repository"
import { BotAnswer } from "../../core/entities/bot-answer"
import { BotAnswerMapper } from "../../core/mappers/bot-answer-mapper"

@Injectable()
export class PrismaBotAnswerRepository implements BotAnswerRepository {
  constructor(private prisma: PrismaService) {}

  async findBySessionId(sessionId: string): Promise<BotAnswer[]> {
    const raws = await this.prisma.botAnswer.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    })
    return raws.map(BotAnswerMapper.toDomain)
  }

  async findBySessionAndQuestion(
    sessionId: string,
    questionId: string,
  ): Promise<BotAnswer | null> {
    const raw = await this.prisma.botAnswer.findFirst({
      where: { sessionId, questionId },
    })
    if (!raw) return null
    return BotAnswerMapper.toDomain(raw)
  }

  async create(answer: BotAnswer): Promise<void> {
    const data = BotAnswerMapper.toPersistence(answer)
    await this.prisma.botAnswer.create({ data })
  }
}
