import { Router, Request, Response, NextFunction } from "express";
import { getStockController } from "./controllers/get-stock.controller/get-history.controller";
import { getStockByIdController } from "./controllers/get-stocks-by-id.controller";


const router = Router();


router.get('/', (request: Request, response: Response, next: NextFunction) => {
	return getStockController.handle(request, response, next);
});

router.get('/id', (request: Request, response: Response, next: NextFunction) => {
	return getStockByIdController.handle(request, response, next);
});

export {router as stockRouter };