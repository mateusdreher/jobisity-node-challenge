import { NextFunction, Request, Response } from 'express';
import { IUseCase } from '../../../domain/interfaces';
import { CustomError } from '../../../../utils/error';

export class GetStockController {
	private readonly useCase;

	constructor(useCase: IUseCase<unknown, unknown>) {
		this.useCase = useCase;
	}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const symbol = request.query['symbol'];
			

			if (!symbol) {
				throw new CustomError('Symbol of stock must be provided', 'BadRequest');
			}

			const result = await this.useCase.execute(symbol);

			return response.status(200).json(result);
		} catch(error) {
			next(error)
		}
	}
}