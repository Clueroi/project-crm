# 🚀 Project CRM

A **Customer Relationship Management (CRM)** system built with **NestJS**, featuring an interactive chatbot, ticket management, and user administration.

## 🚀 Technologies

- **Framework**: **NestJS** - Progressive Node.js framework
- **Language**: TypeScript
- **Database**: PostgreSQL with **Prisma ORM**
- **Cache**: Redis
- **Validation**: class-validator + class-transformer
- **Schema Validation**: Zod
- **Testing**: Jest + Vitest
- **Architecture**: Clean Architecture / Domain-Driven Design (DDD)

## 📋 Features

### Interactive Chatbot

- Automated question-and-answer workflow
- Conversation sessions with progress tracking
- Support for multiple-choice answers
- Session state management (`IN_PROGRESS`, `COMPLETED`, `CANCELLED`)

### Ticket Management

- Create and manage support tickets
- Ticket messaging system
- Status management (`PENDING`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`)
- Priority levels (`LOW`, `MEDIUM`, `HIGH`)
- Integration with chatbot sessions

### User Management

- User creation with password encryption
- Data validation using Zod

### Webhooks

- Integration with external services through webhooks

## 🏗️ Architecture

The project follows the principles of **Clean Architecture** and **Domain-Driven Design (DDD)**.

```text
src/
├── core/              # Shared infrastructure layer
│   ├── entities/      # Base entities
│   ├── errors/        # Error handling
│   ├── mappers/       # Data mappers
│   └── either.ts      # Either implementation for error handling
├── domain/            # Domain layer (business rules)
│   ├── bot/           # Chatbot domain
│   ├── ticket/        # Ticket domain
│   └── user/          # User domain
└── infra/             # Infrastructure layer
    ├── database/      # Repository implementations
    ├── http/          # Controllers and HTTP modules
    ├── app.module.ts  # Root module
    └── main.ts        # Application entry point
```

## 🗄️ Data Model

### BotQuestion

- Configurable chatbot questions
- JSON-based answer options
- Question ordering

### BotSession

- Phone-based conversation sessions
- Current step tracking
- Session status

### BotAnswer

- User-submitted answers
- Relationship with sessions and questions

### Ticket

- Support tickets
- Status and priority
- Optional chatbot session integration

### TicketMessage

- Messages associated with tickets
- Support for internal messages

## 🛠️ Environment Setup

### Prerequisites

- Node.js (v24+)
- Docker and Docker Compose
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd project-crm
```

2. Install dependencies:

```bash
npm install
```

3. Configure the environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5434/nest-crm?schema=public"
PORT=3000
```

4. Start the required services:

```bash
docker-compose up -d
```

5. Run Prisma migrations:

```bash
npx prisma migrate dev
```

6. (Optional) Seed the database:

```bash
npx prisma db seed
```

## 🚀 Running the Project

### Development

```bash
# Watch mode
npm run start:dev

# Debug mode
npm run start:debug
```

### Production

```bash
# Build the project
npm run build

# Start the production server
npm run start:prod
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build the project |
| `npm run format` | Format the code with Prettier |
| `npm run start` | Start the application |
| `npm run start:dev` | Start in watch mode |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Generate a coverage report |

## 🔧 API Endpoints

The API is available at:

```text
http://localhost:3000/api
```

### Chatbot

- `POST /api/bot/session` - Create a new chatbot session
- `POST /api/bot/message` - Process a chatbot message
- `GET /api/bot/session/:id/answers` - Retrieve session answers
- `DELETE /api/bot/session/:id` - Cancel a session

### Tickets

- `POST /api/tickets` - Create a ticket
- `GET /api/tickets` - List all tickets
- `GET /api/tickets/:id` - Retrieve a specific ticket
- `PATCH /api/tickets/:id/status` - Update ticket status
- `POST /api/tickets/:id/messages` - Add a message to a ticket

### Users

- `POST /api/users` - Create a new user

### Webhooks

- `POST /api/webhooks` - Receive external webhooks

## 🐳 Docker

The project includes a `docker-compose.yml` file with the following services:

- **PostgreSQL** - Database running on port **5434**
- **Redis** - Cache running on port **6379**

## 📦 Main Dependencies

- `@nestjs/common` - NestJS common modules
- `@nestjs/core` - NestJS core
- `@nestjs/config` - Environment configuration
- `@prisma/client` - Prisma Client
- `class-validator` - Class validation
- `zod` - Schema validation
- `vitest` - Testing framework

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/new-feature
```

3. Commit your changes:

```bash
git commit -m "Add new feature"
```

4. Push your branch:

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

## 📄 License

This project is proprietary software.
