import { BotAnswer } from "../entities/bot-answer"
import { UniqueEntityId } from "../entities/unique-entity-id"

type PersistenceRaw = {
  id: string
  sessionId: string
  questionId: string
  value: string
  createdAt: Date
}

export class BotAnswerMapper {
  static toDomain(raw: PersistenceRaw): BotAnswer {
    return BotAnswer.create(
      {
        sessionId: raw.sessionId,
        questionId: raw.questionId,
        value: raw.value,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(answer: BotAnswer): PersistenceRaw {
    return {
      id: answer.id.toString(),
      sessionId: answer.sessionId,
      questionId: answer.questionId,
      value: answer.value,
      createdAt: answer.createdAt,
    }
  }
}
