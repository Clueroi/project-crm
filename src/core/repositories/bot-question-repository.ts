import { BotQuestion } from "../../domain/bot/enterprise/entities/bot-question"

export interface BotQuestionRepository {
  findById(id: string): Promise<BotQuestion | null>
  findByOrder(order: number): Promise<BotQuestion | null>
  findMany(): Promise<BotQuestion[]>
  count(): Promise<number>
  create(question: BotQuestion): Promise<void>
}
