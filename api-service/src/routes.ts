import { Router, Request, Response, NextFunction } from "express";

const router = Router()

router.post('/', (request: Request, response: Response, next: NextFunction) => {
	response.status(200).send();
});


export {router as healthRouter}