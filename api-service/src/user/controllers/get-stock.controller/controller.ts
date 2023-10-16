import { CustomError } from "../../../utils/error";
import { GetStockRequestDTO, IUseCase, StockDTO } from "../../domain/interfaces";
import { NextFunction, Request, Response } from 'express';

export class GetStockController {
	private readonly useCase;

	constructor(useCase: IUseCase<GetStockRequestDTO, StockDTO>) {
		this.useCase = useCase;
	}

	async handle(request: Request, response: Response,  next: NextFunction) {
		try {
			const stockToGet = request.query.q as string;

			if (!stockToGet) {
				throw new CustomError('You must to provide a stock to consult', 'UnprocessableEntity')
			}
			const stock = await this.useCase.execute({stock: stockToGet, userId: request.userId});

			return response.status(200).json(stock);
		} catch(error) {
			next(error);	
		}
	}
}