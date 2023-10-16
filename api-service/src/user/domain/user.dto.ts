export interface StatsDTO {
	stock: string;
	times_requested: number;
}

export interface StockDTO {
	name: string;
	symbol: string;
	open: number;
	high: number;
	low: number;
	close: number;
}

export interface GetStockRequestDTO {
	stock: string;
	userId: string;
}

export interface LoginDTO {
	email: string;
	password: string;
}

export interface RegisterUserDTO {
	email: string;
	role: string;
}

export interface HistoryDTO extends StockDTO {
	date: string;
}