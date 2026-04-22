import {
  Controller,
  Post,
  Body,
  Logger,
} from "@nestjs/common"
import { WebhookN8nDto } from "../dto/webhook-n8n-dto"
import { HandleBotMessageUseCase } from "../../../domain/bot/application/use-cases/handle-bot-message"
import { CreateBotSessionUseCase } from "../../../domain/bot/application/use-cases/create-bot-session"
import { CreateTicketUseCase } from "../../../domain/ticket/application/use-cases/create-ticket"

@Controller("webhook")
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name)

  constructor(
    private handleBotMessageUseCase: HandleBotMessageUseCase,
    private createBotSessionUseCase: CreateBotSessionUseCase,
    private createTicketUseCase: CreateTicketUseCase,
  ) {}

  @Post("n8n")
  async handleN8n(@Body() dto: WebhookN8nDto) {
    this.logger.log(`Webhook N8N received from ${dto.phone}: ${dto.message}`)

    const lowerMessage = dto.message.toLowerCase().trim()

    // Se a mensagem indica um problema direto, criar ticket imediatamente
    if (lowerMessage === "suporte" || lowerMessage === "ajuda" || lowerMessage === "problema") {
      const ticketResult = await this.createTicketUseCase.execute({
        title: `Suporte - ${dto.customerName ?? dto.phone}`,
        description: dto.message,
        phone: dto.phone,
        sessionId: dto.sessionId,
      })

      return {
        action: "ticket_created",
        ticketId: ticketResult.ticket.id.toString(),
        reply: "Seu chamado foi registrado! Em breve nossa equipe entrará em contato.",
      }
    }

    // Fluxo normal do bot
    if (lowerMessage === "oi" || lowerMessage === "olá" || lowerMessage === "ola") {
      const sessionResult = await this.createBotSessionUseCase.execute({
        phone: dto.phone,
      })

      return {
        action: "session_started",
        sessionId: sessionResult.session.id.toString(),
        reply: sessionResult.firstQuestion?.text ?? "Nenhuma pergunta cadastrada.",
        options: sessionResult.firstQuestion?.options ?? null,
      }
    }

    const result = await this.handleBotMessageUseCase.execute({
      phone: dto.phone,
      message: dto.message,
    })

    // Se a sessão do bot finalizou, criar ticket automaticamente com as respostas
    if (result.isFinished && result.sessionId) {
      const ticketResult = await this.createTicketUseCase.execute({
        title: `Contato via WhatsApp - ${dto.phone}`,
        description: `Conversa completada via chatbot. Session: ${result.sessionId}`,
        phone: dto.phone,
        sessionId: result.sessionId,
      })

      return {
        ...result,
        action: "ticket_auto_created",
        ticketId: ticketResult.ticket.id.toString(),
      }
    }

    return {
      action: "bot_reply",
      ...result,
    }
  }
}
