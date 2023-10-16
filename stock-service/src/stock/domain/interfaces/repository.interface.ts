import { Stock } from "../stock";

export interface IStockRepository {
	save(stock: Stock): Promise<Stock>;
	getStockById(_id: string): Promise<Stock | null>
}