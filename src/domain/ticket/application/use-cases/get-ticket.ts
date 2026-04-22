import { Injectable, Inject } from "@nestjs/common"
import { TicketRepository } from "../repositories/ticket-repository"
import { TicketMessageRepository } from "../repositories/ticket-message-repository"

interface GetTicketInput {
  id: string
}

interface MessageDetail {
  id: string
  content: string
  isInternal: boolean
  sender: string
  createdAt: Date
}

interface GetTicketOutput {
  id: string
  title: string
  description: string
  status: string
  priority: string
  phone: string
  sessionId: string | null
  createdAt: Date
  updatedAt: Date | null
  messages: MessageDetail[]
}

@Injectable()
export class GetTicketUseCase {
  constructor(
    @Inject("TicketRepository")
    private ticketRepository: TicketRepository,
    @Inject("TicketMessageRepository")
    private ticketMessageRepository: TicketMessageRepository,
  ) {}

  async execute(input: GetTicketInput): Promise<GetTicketOutput | null> {
    const ticket = await this.ticketRepository.findById(input.id)
    if (!ticket) return null

    const messages = await this.ticketMessageRepository.findByTicketId(
      ticket.id.toString(),
    )

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
      messages: messages.map((m) => ({
        id: m.id.toString(),
        content: m.content,
        isInternal: m.isInternal,
        sender: m.sender,
        createdAt: m.createdAt,
      })),
    }
  }
}
