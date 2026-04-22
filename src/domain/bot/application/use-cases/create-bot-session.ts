import { Injectable, Inject } from "@nestjs/common"
import { BotQuestionRepository } from "../../../../core/repositories/bot-question-repository"
import { BotSessionRepository } from "../../../../core/repositories/bot-session-repository"
import { BotSession } from "../../enterprise/entities/bot-session"


interface CreateBotSessionInput {
  phone: string
}

interface CreateBotSessionOutput {
  session: BotSession
  firstQuestion: {
    id: string
    text: string
    options: string[] | null
  } | null
}

@Injectable()
export class CreateBotSessionUseCase {
  constructor(
    @Inject("BotSessionRepository")
    private sessionRepository: BotSessionRepository,
    @Inject("BotQuestionRepository")
    private questionRepository: BotQuestionRepository,
  ) {}

  async execute(input: CreateBotSessionInput): Promise<CreateBotSessionOutput> {
    const existingSession =
      await this.sessionRepository.findActiveByPhone(input.phone)

    if (existingSession) {
      const currentQuestion = await this.questionRepository.findByOrder(
        existingSession.currentStep,
      )
      return {
        session: existingSession,
        firstQuestion: currentQuestion
          ? {
              id: currentQuestion.id.toString(),
              text: currentQuestion.text,
              options: currentQuestion.options,
            }
          : null,
      }
    }

    const session = BotSession.create({
      phone: input.phone,
      currentStep: 0,
      status: "IN_PROGRESS",
      startedAt: new Date(),
      completedAt: null,
    })

    await this.sessionRepository.create(session)

    const firstQuestion = await this.questionRepository.findByOrder(0)

    return {
      session,
      firstQuestion: firstQuestion
        ? {
            id: firstQuestion.id.toString(),
            text: firstQuestion.text,
            options: firstQuestion.options,
          }
        : null,
    }
  }
}
