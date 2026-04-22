import { Injectable, Inject } from "@nestjs/common"
import { TicketRepository } from "../repositories/ticket-repository"
import { TicketStatus, TicketPriority } from "../../enterprise/entities/ticket"

interface UpdateTicketStatusInput {
  id: string
  status?: TicketStatus
  priority?: TicketPriority
}

interface UpdateTicketStatusOutput {
  success: boolean
  message: string
}

@Injectable()
export class UpdateTicketStatusUseCase {
  constructor(
    @Inject("TicketRepository")
    private ticketRepository: TicketRepository,
  ) {}

  async execute(input: UpdateTicketStatusInput): Promise<UpdateTicketStatusOutput> {
    const ticket = await this.ticketRepository.findById(input.id)

    if (!ticket) {
      return {
        success: false,
        message: "Ticket não encontrado.",
      }
    }

    if (input.status) {
      switch (input.status) {
        case "IN_PROGRESS":
          ticket.start()
          break
        case "RESOLVED":
          ticket.resolve()
          break
        case "CLOSED":
          ticket.close()
          break
        case "PENDING":
          ticket.reopen()
          break
      }
    }

    if (input.priority) {
      ticket.setPriority(input.priority)
    }

    await this.ticketRepository.save(ticket)

    return {
      success: true,
      message: "Ticket atualizado com sucesso.",
    }
  }
}
