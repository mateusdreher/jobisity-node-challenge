import {  Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { PasswordUtil } from '../utils/password';

interface ITokenData { 
    userId: string,
    userRole: string,
    iat: number,
    exp: number
} 

async function authenticationMiddleware(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    const authHeader = request.headers.authorization as string;

    if (!authHeader) {
        return response.status(401).json({
			errorType: 'Unauthorized',
			message: 'No auth token provided',
		})
    }
    
    const token = authHeader.replace('Bearer', '').trim();


    try {
        const data: ITokenData = jwt.verify(token, process.env.SECRET ?? PasswordUtil.getSecretJWT()) as ITokenData;
        request.userId = data.userId; 
        request.userRole = data.userRole;
        
        return next();
    }
    catch(error) {
        return response.status(401).json({
			errorType: 'Unauthorized',
			message: 'Token invalid',
		})
    }
}   



export { authenticationMiddleware };