import { Entity } from "../../../../core/entities/entity"
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id"

export type TicketStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH"

export interface TicketProps {
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  phone: string
  sessionId: string | null
  createdAt: Date
  updatedAt: Date | null
}

export class Ticket extends Entity<TicketProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get status() {
    return this.props.status
  }

  get priority() {
    return this.props.priority
  }

  get phone() {
    return this.props.phone
  }

  get sessionId() {
    return this.props.sessionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  start() {
    this.props.status = "IN_PROGRESS"
    this.props.updatedAt = new Date()
  }

  resolve() {
    this.props.status = "RESOLVED"
    this.props.updatedAt = new Date()
  }

  close() {
    this.props.status = "CLOSED"
    this.props.updatedAt = new Date()
  }

  reopen() {
    this.props.status = "IN_PROGRESS"
    this.props.updatedAt = new Date()
  }

  setPriority(priority: TicketPriority) {
    this.props.priority = priority
    this.props.updatedAt = new Date()
  }

  static create(props: TicketProps, id?: UniqueEntityId) {
    return new Ticket(props, id)
  }
}
