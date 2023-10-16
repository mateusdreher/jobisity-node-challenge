import { IUserRepository } from "../../domain/interfaces";
import { LoginUseCase } from "../../use-cases/login.use-case";
import { UserRepository } from "../../user.repository";
import { LoginController } from "./controller";

const userRepository: IUserRepository =  new UserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase);

export { loginController };