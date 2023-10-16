import {  Request, Response, NextFunction } from 'express';

function permissionMiddleware (role: string) {
	return (request: Request, response: Response, next: NextFunction) => {
		const {userRole} = request;

		if (userRole === role) {
			next();
			return;
		}

		return response.status(403).json({
			errorType: 'Forbidden',
			message: 'You do not have sufficient permissions to perform this action',
		})
	}
}

export {permissionMiddleware}