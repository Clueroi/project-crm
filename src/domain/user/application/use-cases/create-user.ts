import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { UserAlreadyExistsError } from "./error/userAlreadyExists"
import { UserRepository } from "../repositories/user-repository"
import { HashGenerator } from "./cryptography/hash-generator"
import { User } from "../../enterprise/entities/user"

interface CreateUserUseCaseRequest {
    name: string
	cpf: string
	enterprise: string
	isOwner: boolean
}


type CreateUserUseCaseResponse = Either<UserAlreadyExistsError, { user: User}>

@Injectable()
export class CreateUserUseCase{
    constructor(
        private userRepository: UserRepository,
        private hashGenerator: HashGenerator
    ){ }

    async Execute({
        name,
        cpf,
        enterprise,
        isOwner
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const userWithSameCPF = await this.userRepository.findByCPF(cpf)

        if (userWithSameCPF) {
            return left(new UserAlreadyExistsError(cpf))
        }

        const user = await User.create({
            name,
            cpf,
            enterprise,
            isOwner
        })

        await this.userRepository.create(user)

        return right({
            user
        })
    }
}