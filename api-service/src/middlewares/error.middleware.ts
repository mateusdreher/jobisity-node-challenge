import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";
import { RedisUtil } from "../utils/redis";

export function errorHandler(err: any, request: Request, response: Response, next: NextFunction) {
	
	if (err instanceof CustomError) {
		RedisUtil.logError(getErrorStack(err.stack), err.message, err.stack ?? '');
		return response.status(err.statusCode).json({
			errorType: err.type,
			message: err.message,
		})
	}
	
	RedisUtil.logError(getErrorStack(err.stack), err.message, err.stack);
	
	response.status(500).send('Internal server error')

}

export function error404Handler(err: any, request: Request, response: Response, next: NextFunction ) {
	response.status(404).send("Sorry can't find that!")
}


function getErrorStack(stack: any): string {
	const errorSplitedSecondPart = stack.split(":")[1];
	
	const errorStack = errorSplitedSecondPart.split(" at ")[1].split(".")[0];
	
	if (!errorStack) {
		return 'Undefined lcoation of error'
	}

	return errorStack;

}