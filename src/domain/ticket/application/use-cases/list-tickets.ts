import { Injectable, Inject } from "@nestjs/common"
import { TicketRepository } from "../repositories/ticket-repository"
import { Ticket } from "../../enterprise/entities/ticket"

interface ListTicketsInput {
  status?: string
  priority?: string
}

interface ListTicketsOutput {
  tickets: Ticket[]
}

@Injectable()
export class ListTicketsUseCase {
  constructor(
    @Inject("TicketRepository")
    private ticketRepository: TicketRepository,
  ) {}

  async execute(input: ListTicketsInput): Promise<ListTicketsOutput> {
    const tickets = await this.ticketRepository.findMany({
      status: input.status,
      priority: input.priority,
    })

    return { tickets }
  }
}
