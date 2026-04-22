import { BotAnswer } from "../../domain/bot/enterprise/entities/bot-answer"

export interface BotAnswerRepository {
  findBySessionId(sessionId: string): Promise<BotAnswer[]>
  findBySessionAndQuestion(
    sessionId: string,
    questionId: string,
  ): Promise<BotAnswer | null>
  create(answer: BotAnswer): Promise<void>
}
