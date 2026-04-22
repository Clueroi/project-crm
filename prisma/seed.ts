import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.botQuestion.createMany({
    data: [
      {
        id: "q1",
        text: "Olá! Qual é o seu nome completo?",
        order: 0,
        options: null,
      },
      {
        id: "q2",
        text: "Qual é o seu e-mail?",
        order: 1,
        options: null,
      },
      {
        id: "q3",
        text: "Qual produto você tem interesse?",
        order: 2,
        options: JSON.stringify(["Produto A", "Produto B", "Produto C"]),
      },
      {
        id: "q4",
        text: "Qual a melhor forma de contato?",
        order: 3,
        options: JSON.stringify(["WhatsApp", "E-mail", "Telefone"]),
      },
      {
        id: "q5",
        text: "Gostaria de receber novidades e promoções?",
        order: 4,
        options: JSON.stringify(["Sim", "Não"]),
      },
    ],
  })

  await prisma.ticket.createMany({
    data: [
      {
        title: "Problema com acesso ao sistema",
        description: "Cliente não consegue acessar o sistema, aparece erro 403.",
        status: "PENDING",
        priority: "HIGH",
        phone: "+5511999990001",
      },
      {
        title: "Dúvida sobre faturamento",
        description: "Cliente quer saber como acessar a segunda via do boleto.",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        phone: "+5511999990002",
      },
      {
        title: "Solicitação de cancelamento",
        description: "Cliente deseja cancelar a assinatura do serviço.",
        status: "RESOLVED",
        priority: "LOW",
        phone: "+5511999990003",
      },
    ],
  })

  console.log("Seed data inserted successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
