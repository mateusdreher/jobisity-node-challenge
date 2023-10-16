import { FetchUtil } from "../../utils/fetch.util";
import { IStockRepository } from "../domain/interfaces/repository.interface";
import { IUseCase } from "../domain/interfaces/use-case.interface";
import { ErrorDTO, StockDTO } from "../domain/stock.dto";

export class GetStockUseCase implements IUseCase<string, StockDTO | ErrorDTO> {
	private stockRepository: IStockRepository;
	private externalStockUrl = '';

	constructor(repository: IStockRepository) {
		this.stockRepository = repository;
	}

	async execute(symbol: string): Promise<StockDTO | ErrorDTO> {
		try {
			this.externalStockUrl = `${process.env.EXTERNAL_STOCK_URL}/`

			const data = await FetchUtil.get(this.externalStockUrl, {s: symbol, f: process.env.EXTERNAL_STOCK_KEY ?? '', e: 'json'})
			const stock = data.symbols[0];
			const stockInserted = await this.stockRepository.save(stock)

			return {...stock, _id: stockInserted._id};
		} catch(err: any) {
			if (err.message && err.message.includes('stocks validation failed')) {
				return {
					error: {
						message: 'Stock validation failed'
					}
				}
			}

			return {
				error: {
					message: 'Error at consult external api'
				}
			}
			}
		}

}