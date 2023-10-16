import { NextFunction, Request, Response } from 'express';
import { IUseCase } from '../../domain/interfaces';
import { CustomError } from '../../../utils/error';

export class GetStockByIdController {
	private readonly useCase;

	constructor(useCase: IUseCase<unknown, unknown>) {
		this.useCase = useCase;
	}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const id = request.query['id'];
			

			if (!id) {
				throw new CustomError('Stock id must be provided', 'BadRequest');
			}

			const result = await this.useCase.execute(id);

			return response.status(200).json(result);
		} catch(error) {
			next(error)
		}
	}
}