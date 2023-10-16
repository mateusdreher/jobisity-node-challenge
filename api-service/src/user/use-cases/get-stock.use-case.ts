import { CustomError } from "../../utils/error";
import { FetchUtil } from "../../utils/fetch.util";
import { IUserRepository, IUseCase, StockDTO, GetStockRequestDTO } from "../domain/interfaces";

export class GetStockUseCase implements IUseCase<GetStockRequestDTO, StockDTO> {
	private readonly userRepository: IUserRepository;
	constructor (repository: IUserRepository) {
		this.userRepository = repository;
	}

	async execute(params: GetStockRequestDTO): Promise<StockDTO> {
		try {
			const stockUrl = `${process.env.STOCK_API_URL}/stock`

			const stock = await FetchUtil.get(stockUrl, {symbol: params.stock})
			
			if (stock.error) {
				throw new CustomError(stock.error.message ?? 'Stock symbol invalid', 'InternalServerError');
			}
			this.userRepository.saveHistory(params.userId, stock.symbol, stock._id);

			return stock;

		} catch(error) {
			throw error;
		}
	}
}