import { Ticket, TicketProps } from "../../domain/ticket/enterprise/entities/ticket"
import { UniqueEntityId } from "../entities/unique-entity-id"

type PersistenceRaw = {
  id: string
  title: string
  description: string
  status: string
  priority: string
  phone: string
  sessionId: string | null
  createdAt: Date
  updatedAt: Date | null
}

export class TicketMapper {
  static toDomain(raw: PersistenceRaw): Ticket {
    return Ticket.create(
      {
        title: raw.title,
        description: raw.description,
        status: raw.status as TicketProps["status"],
        priority: raw.priority as TicketProps["priority"],
        phone: raw.phone,
        sessionId: raw.sessionId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(ticket: Ticket): PersistenceRaw {
    return {
      id: ticket.id.toString(),
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      phone: ticket.phone,
      sessionId: ticket.sessionId,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    }
  }
}
