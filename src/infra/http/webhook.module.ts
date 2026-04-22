import { Module } from "@nestjs/common"
import { WebhookController } from "./controllers/webhook.controller"
import { PrismaService } from "../database/prisma.service"
import { PrismaBotSessionRepository } from "../database/prisma-bot-session-repository"
import { PrismaBotQuestionRepository } from "../database/prisma-bot-question-repository"
import { PrismaBotAnswerRepository } from "../database/prisma-bot-answer-repository"
import { PrismaTicketRepository } from "../database/prisma-ticket-repository"
import { HandleBotMessageUseCase } from "../../domain/bot/application/use-cases/handle-bot-message"
import { CreateBotSessionUseCase } from "../../domain/bot/application/use-cases/create-bot-session"
import { CreateTicketUseCase } from "../../domain/ticket/application/use-cases/create-ticket"

@Module({
  controllers: [WebhookController],
  providers: [
    PrismaService,
    {
      provide: "BotSessionRepository",
      useClass: PrismaBotSessionRepository,
    },
    {
      provide: "BotQuestionRepository",
      useClass: PrismaBotQuestionRepository,
    },
    {
      provide: "BotAnswerRepository",
      useClass: PrismaBotAnswerRepository,
    },
    {
      provide: "TicketRepository",
      useClass: PrismaTicketRepository,
    },
    HandleBotMessageUseCase,
    CreateBotSessionUseCase,
    CreateTicketUseCase,
  ],
})
export class WebhookModule {}
