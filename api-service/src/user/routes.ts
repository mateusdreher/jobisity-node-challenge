import { Router, Request, Response, NextFunction } from "express";
import { createUserController, getHistoryController, getStatsController, getStockController, loginController,resetPasswordController } from "./controllers";
import { authenticationMiddleware, permissionMiddleware } from "../middlewares";

const router = Router();

router.post('/', (request: Request, response: Response, next: NextFunction) => {
	return createUserController.handle(request, response, next);
});

router.post('/login', (request: Request, response: Response, next: NextFunction) => {
	return loginController.handle(request, response, next);
});

router.get('/history', authenticationMiddleware, (request: Request, response: Response, next: NextFunction) => {
	return getHistoryController.handle(request, response, next);
});

router.get('/stats', authenticationMiddleware, permissionMiddleware('admin'), (request: Request, response: Response,next: NextFunction) => {
	return getStatsController.handle(request, response, next);
});

router.get('/stock', authenticationMiddleware, (request: Request, response: Response, next: NextFunction) => {
	return getStockController.handle(request, response, next);
});

router.post('/reset-password', (request: Request, response: Response, next: NextFunction) => {
	return resetPasswordController.handle(request, response, next);
});
export {router as userRouter };