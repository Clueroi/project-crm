import { BotSession, BotSessionProps } from "../entities/bot-session"
import { UniqueEntityId } from "../entities/unique-entity-id"

type PersistenceRaw = {
  id: string
  phone: string
  currentStep: number
  status: string
  startedAt: Date
  completedAt: Date | null
}

export class BotSessionMapper {
  static toDomain(raw: PersistenceRaw): BotSession {
    return BotSession.create(
      {
        phone: raw.phone,
        currentStep: raw.currentStep,
        status: raw.status as BotSessionProps["status"],
        startedAt: raw.startedAt,
        completedAt: raw.completedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(session: BotSession): PersistenceRaw {
    return {
      id: session.id.toString(),
      phone: session.phone,
      currentStep: session.currentStep,
      status: session.status,
      startedAt: session.startedAt,
      completedAt: session.completedAt,
    }
  }
}
