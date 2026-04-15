import { BotQuestion } from "../entities/bot-question"
import { UniqueEntityId } from "../entities/unique-entity-id"

type PersistenceRaw = {
  id: string
  text: string
  order: number
  options: string | null
  createdAt: Date
}

export class BotQuestionMapper {
  static toDomain(raw: PersistenceRaw): BotQuestion {
    return BotQuestion.create(
      {
        text: raw.text,
        order: raw.order,
        options: raw.options ? JSON.parse(raw.options) : null,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(question: BotQuestion): PersistenceRaw {
    return {
      id: question.id.toString(),
      text: question.text,
      order: question.order,
      options: question.options ? JSON.stringify(question.options) : null,
      createdAt: question.createdAt,
    }
  }
}
