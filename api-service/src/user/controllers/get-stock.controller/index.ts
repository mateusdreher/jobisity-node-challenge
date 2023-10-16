import { IUserRepository } from "../../domain/interfaces";
import { GetStockUseCase } from "../../use-cases/get-stock.use-case";
import { UserRepository } from "../../user.repository";
import { GetStockController } from "./controller";

const userRepository: IUserRepository =  new UserRepository();
const getStockUseCase = new GetStockUseCase(userRepository);
const getStockController = new GetStockController(getStockUseCase);

export { getStockController };