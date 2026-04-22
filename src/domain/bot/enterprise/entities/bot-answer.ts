import { Entity } from "../../../../core/entities/entity"
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id"

export interface BotAnswerProps {
  sessionId: string
  questionId: string
  value: string
  createdAt: Date
}

export class BotAnswer extends Entity<BotAnswerProps> {
  get sessionId() {
    return this.props.sessionId
  }

  get questionId() {
    return this.props.questionId
  }

  get value() {
    return this.props.value
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: BotAnswerProps, id?: UniqueEntityId) {
    return new BotAnswer(props, id)
  }
}
