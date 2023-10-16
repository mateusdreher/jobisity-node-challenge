import { CustomError } from "../../utils/error";
import { FetchUtil } from "../../utils/fetch.util";
import { IUserRepository, IUseCase, StatsDTO, HistoryDTO } from "../domain/interfaces";

export class GetHistoryUseCase implements IUseCase<string, HistoryDTO[]> {
	private userRepository: IUserRepository;
	private stockUrl = '';
	constructor (repository: IUserRepository) {
		this.userRepository = repository;
		this.fetchStock = this.fetchStock.bind(this);
    	this.fetchHistoryStocks = this.fetchHistoryStocks.bind(this);
	}

	async execute(id: string): Promise<HistoryDTO[]> {
		try {
			this.stockUrl = `${process.env.STOCK_API_URL}/stock/id`
			const user = await this.userRepository.getUserById(id);

			if (!user) {
				throw new CustomError('User not found', 'NotFound');
			}

			if (!user.history || user.history.length === 0) {
				return [];
			}
			
			const userStocksPromises = user.history.map(this.fetchHistoryStocks)
			const result = await Promise.all(userStocksPromises);

			return result.flat();
			
		} catch(error) {
			throw error;
		}	
	}

	async fetchStock(id: string) {
		return await FetchUtil.get(this.stockUrl, {id});
	}

	async fetchHistoryStocks(history: any) {
		const stockPromises = history.stockIds.map(this.fetchStock);
		return await Promise.all(stockPromises);
	}
}