import { Module } from "@nestjs/common"
import { BotController } from "./controllers/bot.controller"
import { PrismaService } from "../database/prisma.service"
import { PrismaBotSessionRepository } from "../database/prisma-bot-session-repository"
import { PrismaBotQuestionRepository } from "../database/prisma-bot-question-repository"
import { PrismaBotAnswerRepository } from "../database/prisma-bot-answer-repository"
import { CreateBotSessionUseCase } from "../../core/use-cases/create-bot-session"
import { HandleBotMessageUseCase } from "../../core/use-cases/handle-bot-message"
import { CancelBotSessionUseCase } from "../../core/use-cases/cancel-bot-session"
import { GetSessionAnswersUseCase } from "../../core/use-cases/get-session-answers"

@Module({
  controllers: [BotController],
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
    CreateBotSessionUseCase,
    HandleBotMessageUseCase,
    CancelBotSessionUseCase,
    GetSessionAnswersUseCase,
  ],
})
export class BotModule {}
