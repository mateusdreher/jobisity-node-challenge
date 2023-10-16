import { GetStockController } from './controller';
import { IStockRepository } from "../../../domain/interfaces";
import { StockRepository } from "../../../stock.repository";
import { GetStockUseCase } from '../../../use-cases/get-stock.use-case';

const stockRepository: IStockRepository =  new StockRepository();
const getStockUseCase = new GetStockUseCase(stockRepository);
const getStockController = new GetStockController(getStockUseCase);

export { getStockController };