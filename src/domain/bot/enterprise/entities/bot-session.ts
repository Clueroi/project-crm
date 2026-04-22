import { Entity } from "../../../../core/entities/entity"
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id"

export interface BotSessionProps {
  phone: string
  currentStep: number
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  startedAt: Date
  completedAt: Date | null
}

export class BotSession extends Entity<BotSessionProps> {
  get phone() {
    return this.props.phone
  }

  get currentStep() {
    return this.props.currentStep
  }

  get status() {
    return this.props.status
  }

  get startedAt() {
    return this.props.startedAt
  }

  get completedAt() {
    return this.props.completedAt
  }

  advance() {
    this.props.currentStep += 1
  }

  complete() {
    this.props.status = "COMPLETED"
    this.props.completedAt = new Date()
  }

  cancel() {
    this.props.status = "CANCELLED"
    this.props.completedAt = new Date()
  }

  static create(props: BotSessionProps, id?: UniqueEntityId) {
    return new BotSession(props, id)
  }
}
