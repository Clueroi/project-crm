import { Injectable, Inject } from "@nestjs/common"
import { TicketMessageRepository } from "../repositories/ticket-message-repository"
import { TicketRepository } from "../repositories/ticket-repository"
import { TicketMessage } from "../../enterprise/entities/ticket-message"

interface AddTicketMessageInput {
  ticketId: string
  content: string
  isInternal: boolean
  sender: string
}

interface AddTicketMessageOutput {
  success: boolean
  message: string
}

@Injectable()
export class AddTicketMessageUseCase {
  constructor(
    @Inject("TicketMessageRepository")
    private ticketMessageRepository: TicketMessageRepository,
    @Inject("TicketRepository")
    private ticketRepository: TicketRepository,
  ) {}

  async execute(input: AddTicketMessageInput): Promise<AddTicketMessageOutput> {
    const ticket = await this.ticketRepository.findById(input.ticketId)

    if (!ticket) {
      return {
        success: false,
        message: "Ticket não encontrado.",
      }
    }

    const ticketMessage = TicketMessage.create({
      ticketId: input.ticketId,
      content: input.content,
      isInternal: input.isInternal,
      sender: input.sender,
      createdAt: new Date(),
    })

    await this.ticketMessageRepository.create(ticketMessage)

    return {
      success: true,
      message: "Mensagem adicionada com sucesso.",
    }
  }
}
