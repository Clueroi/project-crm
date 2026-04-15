import { BotAnswer } from "../entities/bot-answer"

export interface BotAnswerRepository {
  findBySessionId(sessionId: string): Promise<BotAnswer[]>
  findBySessionAndQuestion(
    sessionId: string,
    questionId: string,
  ): Promise<BotAnswer | null>
  create(answer: BotAnswer): Promise<void>
}
