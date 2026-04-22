import { TicketMessage } from "../../domain/ticket/enterprise/entities/ticket-message"
import { UniqueEntityId } from "../entities/unique-entity-id"

type PersistenceRaw = {
  id: string
  ticketId: string
  content: string
  isInternal: boolean
  sender: string
  createdAt: Date
}

export class TicketMessageMapper {
  static toDomain(raw: PersistenceRaw): TicketMessage {
    return TicketMessage.create(
      {
        ticketId: raw.ticketId,
        content: raw.content,
        isInternal: raw.isInternal,
        sender: raw.sender,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(message: TicketMessage): PersistenceRaw {
    return {
      id: message.id.toString(),
      ticketId: message.ticketId,
      content: message.content,
      isInternal: message.isInternal,
      sender: message.sender,
      createdAt: message.createdAt,
    }
  }
}
