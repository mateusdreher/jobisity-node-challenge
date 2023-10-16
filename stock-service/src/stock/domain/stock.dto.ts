export interface StockDTO {
	name: string;
	symbol: string;
	open: number;
	high: number;
	low: number;
	close: number;
}


export interface ErrorDTO {
	error: {
		message: string;
	}
}