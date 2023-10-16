import { IUserRepository } from "../../domain/interfaces";
import { CreateUserUseCase } from "../../use-cases";
import { UserRepository } from "../../user.repository";
import { CreateUserController } from "./controller";

const userRepository: IUserRepository =  new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };