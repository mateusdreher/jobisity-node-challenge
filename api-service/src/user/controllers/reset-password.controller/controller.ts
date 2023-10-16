import { IUseCase } from "../../domain/interfaces";
import { NextFunction, Request, Response } from 'express';

export class ResetPasswordController {
	private readonly useCase;

	constructor(useCase: IUseCase<string, string>) {
		this.useCase = useCase;
	}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const { email } = request.body;

			if (!email) {
				response.status(422).send('Review your payload');
			}

			const createdUser = await this.useCase.execute(email);

			return response.status(201).json(createdUser);
		} catch(error) {
			next(error);
		}
	}
}