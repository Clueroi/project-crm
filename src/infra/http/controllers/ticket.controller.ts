import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  Logger,
  NotFoundException,
} from "@nestjs/common"
import { CreateTicketDto } from "../dto/create-ticket-dto"
import { UpdateTicketStatusDto } from "../dto/update-ticket-status-dto"
import { AddTicketMessageDto } from "../dto/add-ticket-message-dto"
import { ListTicketsDto } from "../dto/list-tickets-dto"
import { CreateTicketUseCase } from "../../../domain/ticket/application/use-cases/create-ticket"
import { ListTicketsUseCase } from "../../../domain/ticket/application/use-cases/list-tickets"
import { GetTicketUseCase } from "../../../domain/ticket/application/use-cases/get-ticket"
import { UpdateTicketStatusUseCase } from "../../../domain/ticket/application/use-cases/update-ticket-status"
import { AddTicketMessageUseCase } from "../../../domain/ticket/application/use-cases/add-ticket-message"

@Controller("tickets")
export class TicketController {
  private readonly logger = new Logger(TicketController.name)

  constructor(
    private createTicketUseCase: CreateTicketUseCase,
    private listTicketsUseCase: ListTicketsUseCase,
    private getTicketUseCase: GetTicketUseCase,
    private updateTicketStatusUseCase: UpdateTicketStatusUseCase,
    private addTicketMessageUseCase: AddTicketMessageUseCase,
  ) {}

  @Post()
  async createTicket(@Body() dto: CreateTicketDto) {
    this.logger.log(`Creating ticket: ${dto.title}`)

    const result = await this.createTicketUseCase.execute({
      title: dto.title,
      description: dto.description,
      phone: dto.phone,
      sessionId: dto.sessionId,
      priority: dto.priority as any,
    })

    return {
      id: result.ticket.id.toString(),
      title: result.ticket.title,
      description: result.ticket.description,
      status: result.ticket.status,
      priority: result.ticket.priority,
      phone: result.ticket.phone,
      sessionId: result.ticket.sessionId,
      createdAt: result.ticket.createdAt,
    }
  }

  @Get()
  async listTickets(@Query() dto: ListTicketsDto) {
    const result = await this.listTicketsUseCase.execute({
      status: dto.status,
      priority: dto.priority,
    })

    return result.tickets.map((ticket) => ({
      id: ticket.id.toString(),
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      phone: ticket.phone,
      sessionId: ticket.sessionId,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    }))
  }

  @Get(":id")
  async getTicket(@Param("id") id: string) {
    const result = await this.getTicketUseCase.execute({ id })

    if (!result) {
      throw new NotFoundException("Ticket não encontrado")
    }

    return result
  }

  @Patch(":id/status")
  async updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdateTicketStatusDto,
  ) {
    const result = await this.updateTicketStatusUseCase.execute({
      id,
      status: dto.status as any,
      priority: dto.priority as any,
    })

    if (!result.success) {
      throw new NotFoundException(result.message)
    }

    return { message: result.message }
  }

  @Post(":id/messages")
  async addMessage(
    @Param("id") id: string,
    @Body() dto: AddTicketMessageDto,
  ) {
    const result = await this.addTicketMessageUseCase.execute({
      ticketId: id,
      content: dto.content,
      isInternal: dto.isInternal ?? false,
      sender: dto.sender,
    })

    if (!result.success) {
      throw new NotFoundException(result.message)
    }

    return { message: result.message }
  }
}
