import { TicketMessage } from "../../enterprise/entities/ticket-message"

export abstract class TicketMessageRepository {
  abstract create(message: TicketMessage): Promise<void>
  abstract findByTicketId(ticketId: string): Promise<TicketMessage[]>
}
