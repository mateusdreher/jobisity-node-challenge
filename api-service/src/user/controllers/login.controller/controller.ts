import { CustomError } from "../../../utils/error";
import { IUseCase, LoginDTO } from "../../domain/interfaces";
import { NextFunction, Request, Response } from 'express';


export class LoginController {
	private readonly useCase;

	constructor(useCase: IUseCase<LoginDTO, string>) {
		this.useCase = useCase;
	}

	async handle(request: Request, response: Response,  next: NextFunction) {
		try {
			const {email, password} = request.body

			if (!email || !password) {
				throw new CustomError('Verify your payload', 'BadRequest')
			}
			const token = await this.useCase.execute({email, password});

			request.userId = token as string;


			return response.status(200).json({token});
		} catch(error) {
			next(error);	
		}
	}
}