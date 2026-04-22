import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Logger,
} from "@nestjs/common"
import { HandleMessageDto } from "../dto/handle-message-dto"
import { StartSessionDto } from "../dto/start-session-dto"
import { CancelSessionDto } from "../dto/cancel-session-dto"
import { CancelBotSessionUseCase } from "../../../domain/bot/application/use-cases/cancel-bot-session"
import { CreateBotSessionUseCase } from "../../../domain/bot/application/use-cases/create-bot-session"
import { GetSessionAnswersUseCase } from "../../../domain/bot/application/use-cases/get-session-answers"
import { HandleBotMessageUseCase } from "../../../domain/bot/application/use-cases/handle-bot-message"

@Controller("bot")
export class BotController {
  private readonly logger = new Logger(BotController.name)

  constructor(
    private createBotSessionUseCase: CreateBotSessionUseCase,
    private handleBotMessageUseCase: HandleBotMessageUseCase,
    private cancelBotSessionUseCase: CancelBotSessionUseCase,
    private getSessionAnswersUseCase: GetSessionAnswersUseCase,
  ) {}

  @Post("start")
  async startSession(@Body() dto: StartSessionDto) {
    this.logger.log(`Starting session for phone: ${dto.phone}`)

    const result = await this.createBotSessionUseCase.execute({
      phone: dto.phone,
    })

    return {
      sessionId: result.session.id.toString(),
      status: result.session.status,
      message: result.firstQuestion?.text ?? "Nenhuma pergunta cadastrada.",
      options: result.firstQuestion?.options ?? null,
    }
  }

  @Post("message")
  async handleMessage(@Body() dto: HandleMessageDto) {
    this.logger.log(
      `Message from ${dto.phone}: ${dto.message}`,
    )

    const lowerMessage = dto.message.toLowerCase().trim()

    if (lowerMessage === "cancelar" || lowerMessage === "sair") {
      const result = await this.cancelBotSessionUseCase.execute({
        phone: dto.phone,
      })
      return {
        reply: result.message,
        options: null,
        isFinished: true,
        sessionId: "",
      }
    }

    if (lowerMessage === "oi" || lowerMessage === "olá" || lowerMessage === "ola") {
      const result = await this.createBotSessionUseCase.execute({
        phone: dto.phone,
      })
      return {
        sessionId: result.session.id.toString(),
        reply: result.firstQuestion?.text ?? "Nenhuma pergunta cadastrada.",
        options: result.firstQuestion?.options ?? null,
        isFinished: false,
      }
    }

    const result = await this.handleBotMessageUseCase.execute({
      phone: dto.phone,
      message: dto.message,
    })

    return result
  }

  @Post("cancel")
  async cancelSession(@Body() dto: CancelSessionDto) {
    const result = await this.cancelBotSessionUseCase.execute({
      phone: dto.phone,
    })
    return result
  }

  @Get("answers/:sessionId")
  async getSessionAnswers(@Param("sessionId") sessionId: string) {
    const result = await this.getSessionAnswersUseCase.execute({
      sessionId,
    })

    if (!result) {
      return { error: "Sessão não encontrada" }
    }

    return result
  }
}
