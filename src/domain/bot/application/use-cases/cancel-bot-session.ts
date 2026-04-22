import { Injectable, Inject } from "@nestjs/common"
import { BotSessionRepository } from "../../../../core/repositories/bot-session-repository"


interface CancelBotSessionInput {
  phone: string
}

interface CancelBotSessionOutput {
  success: boolean
  message: string
}

@Injectable()
export class CancelBotSessionUseCase {
  constructor(
    @Inject("BotSessionRepository")
    private sessionRepository: BotSessionRepository,
  ) {}

  async execute(
    input: CancelBotSessionInput,
  ): Promise<CancelBotSessionOutput> {
    const session =
      await this.sessionRepository.findActiveByPhone(input.phone)

    if (!session) {
      return {
        success: false,
        message: "Nenhuma sessão ativa encontrada.",
      }
    }

    session.cancel()
    await this.sessionRepository.save(session)

    return {
      success: true,
      message: "Sessão cancelada com sucesso.",
    }
  }
}
