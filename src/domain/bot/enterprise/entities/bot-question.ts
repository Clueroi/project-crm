import { Entity } from "../../../../core/entities/entity"
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id"

export interface BotQuestionProps {
  text: string
  order: number
  options: string[] | null
  createdAt: Date
}

export class BotQuestion extends Entity<BotQuestionProps> {
  get text() {
    return this.props.text
  }

  get order() {
    return this.props.order
  }

  get options() {
    return this.props.options
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: BotQuestionProps, id?: UniqueEntityId) {
    return new BotQuestion(props, id)
  }
}
