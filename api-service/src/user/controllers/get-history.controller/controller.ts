import { HistoryDTO, IUseCase } from "../../domain/interfaces";
import { NextFunction, Request, Response } from 'express';

export class GetHistoryController {
	private readonly useCase;

	constructor(useCase: IUseCase<string, HistoryDTO[]>) {
		this.useCase = useCase;
	}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const history = await this.useCase.execute(request.userId);

			return response.status(200).json(history);
		} catch(error) {
			next(error)
		}
	}
}