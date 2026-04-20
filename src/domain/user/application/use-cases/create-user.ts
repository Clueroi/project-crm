import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { UserAlreadyExistsError } from "./error/userAlreadyExists"
import { UserRepository } from "../repositories/user-repository"
import { User } from "../../enterprise/entities/user"

interface CreateUserUseCaseRequest {
    name: string
	cpf: string
	enterprise: string
}

type CreateUserUseCaseResponse = Either<
    UserAlreadyExistsError,
    { user: User }
>

@Injectable()
export class CreateAccountUseCase {
    constructor(
        private userRepository: UserRepository,
    ) {}

    async execute({
        name,
        cpf,
        enterprise,
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const userWithSameCPF =
            await this.userRepository.findByCPF(cpf)

        if (userWithSameCPF) {
            return left(
                new UserAlreadyExistsError(cpf)
            )
        }

        const user = await User.create({
            name,
            cpf,
            enterprise,
            isOwner: false,
        })

        await this.userRepository.create(user)

        return right({
            user
        })
    }
}