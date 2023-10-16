import { IUseCase, StatsDTO } from "../../domain/interfaces";
import { NextFunction, Request, Response } from 'express';

export class GetStatsController {
	private readonly useCase;

	constructor(useCase: IUseCase<undefined, StatsDTO[]>) {
		this.useCase = useCase;
	}

	async handle(request: Request, response: Response,  next: NextFunction) {
		try {
			const stats = await this.useCase.execute();

			return response.status(200).json(stats);
		} catch(error) {
			next(error)
		}
	}
}