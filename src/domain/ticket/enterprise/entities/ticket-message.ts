import { Entity } from "../../../../core/entities/entity"
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id"

export interface TicketMessageProps {
  ticketId: string
  content: string
  isInternal: boolean
  sender: string
  createdAt: Date
}

export class TicketMessage extends Entity<TicketMessageProps> {
  get ticketId() {
    return this.props.ticketId
  }

  get content() {
    return this.props.content
  }

  get isInternal() {
    return this.props.isInternal
  }

  get sender() {
    return this.props.sender
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: TicketMessageProps, id?: UniqueEntityId) {
    return new TicketMessage(props, id)
  }
}
