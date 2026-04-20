import { Injectable, Inject } from "@nestjs/common"
import { BotAnswerRepository } from "../../../../core/repositories/bot-answer-repository"
import { BotQuestionRepository } from "../../../../core/repositories/bot-question-repository"
import { BotSessionRepository } from "../../../../core/repositories/bot-session-repository"


interface GetSessionAnswersInput {
  sessionId: string
}

interface AnswerDetail {
  questionText: string
  value: string
}

interface GetSessionAnswersOutput {
  phone: string
  status: string
  answers: AnswerDetail[]
}

@Injectable()
export class GetSessionAnswersUseCase {
  constructor(
    @Inject("BotSessionRepository")
    private sessionRepository: BotSessionRepository,
    @Inject("BotAnswerRepository")
    private answerRepository: BotAnswerRepository,
    @Inject("BotQuestionRepository")
    private questionRepository: BotQuestionRepository,
  ) {}

  async execute(
    input: GetSessionAnswersInput,
  ): Promise<GetSessionAnswersOutput | null> {
    const session = await this.sessionRepository.findById(input.sessionId)
    if (!session) return null

    const answers = await this.answerRepository.findBySessionId(
      session.id.toString(),
    )

    const answerDetails: AnswerDetail[] = []
    for (const answer of answers) {
      const question = await this.questionRepository.findById(
        answer.questionId,
      )
      answerDetails.push({
        questionText: question?.text ?? "Pergunta não encontrada",
        value: answer.value,
      })
    }

    return {
      phone: session.phone,
      status: session.status,
      answers: answerDetails,
    }
  }
}
