import { CustomError } from "../../utils/error";
import { IStockRepository } from "../domain/interfaces/repository.interface";
import { IUseCase } from "../domain/interfaces/use-case.interface";
import { StockDTO } from "../domain/stock.dto";

export class GetStockByIdUseCase implements IUseCase<string, StockDTO> {
	private stockRepository: IStockRepository;

	constructor(repository: IStockRepository) {
		this.stockRepository = repository;
	}

	async execute(id: string): Promise<StockDTO> {
		try {
			const stock = await this.stockRepository.getStockById(id);
			if (!stock) {
				throw new CustomError('Stock not found', 'NotFound');
			}
			
			return stock;
		} catch(error) {
			throw error;
		}
	}

}