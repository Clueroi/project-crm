import { Module } from "@nestjs/common"
import { TicketController } from "./controllers/ticket.controller"
import { PrismaService } from "../database/prisma.service"
import { PrismaTicketRepository } from "../database/prisma-ticket-repository"
import { PrismaTicketMessageRepository } from "../database/prisma-ticket-message-repository"
import { CreateTicketUseCase } from "../../domain/ticket/application/use-cases/create-ticket"
import { ListTicketsUseCase } from "../../domain/ticket/application/use-cases/list-tickets"
import { GetTicketUseCase } from "../../domain/ticket/application/use-cases/get-ticket"
import { UpdateTicketStatusUseCase } from "../../domain/ticket/application/use-cases/update-ticket-status"
import { AddTicketMessageUseCase } from "../../domain/ticket/application/use-cases/add-ticket-message"

@Module({
  controllers: [TicketController],
  providers: [
    PrismaService,
    {
      provide: "TicketRepository",
      useClass: PrismaTicketRepository,
    },
    {
      provide: "TicketMessageRepository",
      useClass: PrismaTicketMessageRepository,
    },
    CreateTicketUseCase,
    ListTicketsUseCase,
    GetTicketUseCase,
    UpdateTicketStatusUseCase,
    AddTicketMessageUseCase,
  ],
})
export class TicketModule {}
