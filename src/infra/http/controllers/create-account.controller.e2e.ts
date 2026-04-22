// import { INestApplication } from "@nestjs/common";
// import { AppModule } from "../../app.module";
// import { Vitest } from "vitest/node";
// import { Test } from "@nestjs/testing";
// import request from "supertest";
// import { beforeEach, describe, expect, test } from "vitest";
// import { PrismaService } from "../../database/prisma.service";

// describe('Create account (E2E'), () => {
// 	let app: INestApplication
// 	let prisma: PrismaService

// 	beforeEach(async () => {
// 		const moduleRef = await Test.createTestingModule({
// 			imports: [AppModule],
// 		})
// 	})


// 	test('[POST] /accounts', async () => {
// 		const response = await request(app.getHttpServer()).post('/accounts').send({
// 			name: 'Jhon',
// 			cpf: "12312312323",
// 			enterprise: 'moretti'
// 		})

// 		expect(response.statusCode).toBe(201)

// 		const userOnDatabase = await prisma.user.findUnique({
// 			where: {
// 				cpf: '12312312323'
// 			}
// 		})

// 		expect(userOnDatabase).toBeTruthy()


// 	})
// }