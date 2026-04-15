import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id";

export interface UserProps {
	name: string
	cpf: string
	enterprise: string
	isOwner: boolean
}

export class User extends Entity<UserProps> {
	get name() {
		return this.props.name
	}

	get cpf() {
		return this.props.cpf
	}

	get enterprise() {
		return this.props.enterprise
	}


	static create(props: UserProps, id?: UniqueEntityId) {
		const user = new User(props, id)

		return user
	}


}