import { Injectable, Inject } from "@nestjs/common"
import { BotAnswer } from "../../enterprise/entities/bot-answer"
import { BotAnswerRepository } from "../../../../core/repositories/bot-answer-repository"
import { BotQuestionRepository } from "../../../../core/repositories/bot-question-repository"
import { BotSessionRepository } from "../../../../core/repositories/bot-session-repository"


interface HandleBotMessageInput {
  phone: string
  message: string
}

interface HandleBotMessageOutput {
  reply: string
  options: string[] | null
  isFinished: boolean
  sessionId: string
}

@Injectable()
export class HandleBotMessageUseCase {
  constructor(
    @Inject("BotSessionRepository")
    private sessionRepository: BotSessionRepository,
    @Inject("BotQuestionRepository")
    private questionRepository: BotQuestionRepository,
    @Inject("BotAnswerRepository")
    private answerRepository: BotAnswerRepository,
  ) {}

  async execute(input: HandleBotMessageInput): Promise<HandleBotMessageOutput> {
    const session =
      await this.sessionRepository.findActiveByPhone(input.phone)

    if (!session) {
      return {
        reply:
          "Nenhuma sessão ativa. Envie 'oi' para iniciar uma nova conversa.",
        options: null,
        isFinished: false,
        sessionId: "",
      }
    }

    const currentQuestion = await this.questionRepository.findByOrder(
      session.currentStep,
    )

    if (!currentQuestion) {
      session.complete()
      await this.sessionRepository.save(session)
      return {
        reply: "Obrigado por responder! Suas respostas foram registradas.",
        options: null,
        isFinished: true,
        sessionId: session.id.toString(),
      }
    }

    if (currentQuestion.options) {
      const isValidOption = currentQuestion.options.some(
        (opt: string) => opt.toLowerCase() === input.message.toLowerCase(),
      )
      if (!isValidOption) {
        return {
          reply: `Opção inválida. Por favor, escolha uma das opções: ${currentQuestion.options.join(", ")}`,
          options: currentQuestion.options,
          isFinished: false,
          sessionId: session.id.toString(),
        }
      }
    }

    const answer = BotAnswer.create({
      sessionId: session.id.toString(),
      questionId: currentQuestion.id.toString(),
      value: input.message,
      createdAt: new Date(),
    })

    await this.answerRepository.create(answer)

    session.advance()

    const totalQuestions = await this.questionRepository.count()

    if (session.currentStep >= totalQuestions) {
      session.complete()
      await this.sessionRepository.save(session)
      return {
        reply: "Obrigado por responder todas as perguntas! Suas respostas foram registradas com sucesso.",
        options: null,
        isFinished: true,
        sessionId: session.id.toString(),
      }
    }

    const nextQuestion = await this.questionRepository.findByOrder(
      session.currentStep,
    )

    await this.sessionRepository.save(session)

    if (!nextQuestion) {
      session.complete()
      await this.sessionRepository.save(session)
      return {
        reply: "Obrigado por responder! Suas respostas foram registradas.",
        options: null,
        isFinished: true,
        sessionId: session.id.toString(),
      }
    }

    return {
      reply: nextQuestion.text,
      options: nextQuestion.options,
      isFinished: false,
      sessionId: session.id.toString(),
    }
  }
}
