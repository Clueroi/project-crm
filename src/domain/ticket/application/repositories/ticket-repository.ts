import { Ticket } from "../../enterprise/entities/ticket"

export abstract class TicketRepository {
  abstract create(ticket: Ticket): Promise<void>
  abstract findById(id: string): Promise<Ticket | null>
  abstract findMany(filters?: { status?: string; priority?: string }): Promise<Ticket[]>
  abstract save(ticket: Ticket): Promise<void>
}
