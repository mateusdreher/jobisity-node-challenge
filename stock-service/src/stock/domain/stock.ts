export class Stock {
	_id?: string;
	name: string;
	symbol: string;
	open: number;
	high: number;
	low: number;
	close: number;

	constructor(stock: Stock) {
		this.name = stock.name;
		this.symbol = stock.symbol;
		this.open = stock.open;
		this.high = stock.high;
		this.low = stock.low;
		this.close = stock.close;
	}
}