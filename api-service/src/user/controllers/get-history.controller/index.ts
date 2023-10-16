import { IUserRepository } from "../../domain/interfaces";
import { GetHistoryUseCase } from "../../use-cases/get-history.use-case";
import { UserRepository } from "../../user.repository";
import { GetHistoryController } from "./controller";

const userRepository: IUserRepository =  new UserRepository();
const getHistoryUseCase = new GetHistoryUseCase(userRepository);
const getHistoryController = new GetHistoryController(getHistoryUseCase);

export { getHistoryController };