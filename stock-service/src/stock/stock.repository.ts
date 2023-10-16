import { IStockRepository } from "./domain/interfaces/repository.interface";
import { Stock } from "./domain/stock";
import { StockModel } from "./stock.model";

export class StockRepository implements IStockRepository {
	private model;

	constructor() {
		this.model = StockModel;
	}
	async save(stock: Stock): Promise<Stock> {
		const result = await this.model.create(stock);

		return result as unknown as Stock;
	}
	async getStockById(_id: string): Promise<Stock> {
		const result = await this.model.findById(_id).select(
			{
				_id: 0,
				__v: 0,
				updatedAt: 0
			}
		).lean()

		return result as unknown as Stock;
	}
	
}