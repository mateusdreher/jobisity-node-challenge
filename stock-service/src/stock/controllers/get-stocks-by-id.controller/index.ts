import { IStockRepository } from '../../domain/interfaces';
import { StockRepository } from '../../stock.repository';
import { GetStockByIdUseCase } from '../../use-cases/get-stock-by-id.use-case';
import { GetStockByIdController } from './controller';


const stockRepository: IStockRepository =  new StockRepository();
const getStockByIdUseCase = new GetStockByIdUseCase(stockRepository);
const getStockByIdController = new GetStockByIdController(getStockByIdUseCase);

export { getStockByIdController };