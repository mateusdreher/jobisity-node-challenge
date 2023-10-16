import { IUserRepository } from "../../domain/interfaces";
import { GetStatsUseCase } from "../../use-cases/get-stats.use-case";
import { UserRepository } from "../../user.repository";
import { GetStatsController } from "./controller";

const userRepository: IUserRepository =  new UserRepository();
const getStatsUseCase = new GetStatsUseCase(userRepository);
const getStatsController = new GetStatsController(getStatsUseCase);

export { getStatsController };