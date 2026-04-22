import { Injectable, Inject } from "@nestjs/common"
import { TicketRepository } from "../repositories/ticket-repository"
import { Ticket, TicketPriority, TicketStatus } from "../../enterprise/entities/ticket"

interface CreateTicketInput {
  title: string
  description: string
  phone: string
  sessionId?: string
  priority?: TicketPriority
}

interface CreateTicketOutput {
  ticket: Ticket
}

@Injectable()
export class CreateTicketUseCase {
  constructor(
    @Inject("TicketRepository")
    private ticketRepository: TicketRepository,
  ) {}

  async execute(input: CreateTicketInput): Promise<CreateTicketOutput> {
    const ticket = Ticket.create({
      title: input.title,
      description: input.description,
      status: "PENDING" as TicketStatus,
      priority: input.priority ?? "MEDIUM",
      phone: input.phone,
      sessionId: input.sessionId ?? null,
      createdAt: new Date(),
      updatedAt: null,
    })

    await this.ticketRepository.create(ticket)

    return { ticket }
  }
}
