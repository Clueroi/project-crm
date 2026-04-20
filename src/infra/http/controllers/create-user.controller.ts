import { Body, ConflictException, HttpCode, Post } from "@nestjs/common";
import { CreateAccountUseCase } from "../../../domain/user/application/use-cases/create-user";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../domain/user/application/use-cases/error/userAlreadyExists";



const createAccountScheme = z.object({
	name: z.string(),
	cpf: z.coerce.string(),
	enterprise: z.string()
})

type CreateAccountBodyScheme = z.infer<typeof createAccountScheme>

export class CreateAccountController {
	constructor(
		private createAccount: CreateAccountUseCase
	) { }

	@Post()
	@HttpCode(201)
	async handle(
		@Body() body: CreateAccountBodyScheme
	) {
		const { name, cpf, enterprise } = body

		const result = await this.createAccount.execute({
			name,
			cpf,
			enterprise
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case UserAlreadyExistsError:
					throw new ConflictException(error.message)
				default:
					throw new Error(error.message)
			}
		}
	}
}