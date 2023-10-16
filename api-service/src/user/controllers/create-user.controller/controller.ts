import { IUseCase, LoginDTO, RegisterUserDTO } from "../../domain/interfaces";
import { NextFunction, Request, Response } from 'express';

export class CreateUserController {
	private readonly useCase;

	constructor(useCase: IUseCase<RegisterUserDTO, LoginDTO>) {
		this.useCase = useCase;
	}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, role } = request.body;

			if (!email || !role) {
				response.status(422).send('Review your payload');
			}

			const createdUser = await this.useCase.execute({email, role});

			return response.status(201).json(createdUser);
		} catch(error) {
			next(error);
		}
	}
}