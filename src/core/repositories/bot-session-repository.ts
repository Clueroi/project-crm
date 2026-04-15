import { BotSession } from "../entities/bot-session"

export interface BotSessionRepository {
  findById(id: string): Promise<BotSession | null>
  findByPhone(phone: string): Promise<BotSession | null>
  findActiveByPhone(phone: string): Promise<BotSession | null>
  create(session: BotSession): Promise<void>
  save(session: BotSession): Promise<void>
}
