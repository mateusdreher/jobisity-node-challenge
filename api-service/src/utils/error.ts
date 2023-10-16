export type ErrorType = 
'NotFound' |
'BadRequest' |
'Unauthorized' |
'Forbidden' | 
'InternalServerError' |
'Conflict' |
'UnprocessableEntity'

const errorTypeToStatusCode: Record<ErrorType, number> = {
	NotFound: 404,
	BadRequest: 400,
	Unauthorized: 401,
	Forbidden: 403,
	InternalServerError: 500,
	Conflict: 409,
	UnprocessableEntity: 422
  };

export class CustomError extends Error {
	statusCode: number;
	message: string;
	type: ErrorType;

	constructor(message: string, type: ErrorType) {
		super(message);
		this.statusCode = this.getStatusFromErrorType(type);
		this.message = message;
		this.type = type;
	}


	private getStatusFromErrorType(type: ErrorType): number {
		return errorTypeToStatusCode[type];
	}

}