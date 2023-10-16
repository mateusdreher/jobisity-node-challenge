import { IUserRepository } from "../../domain/interfaces";
import { ResetPasswordUseCase } from "../../use-cases/reset-password.use-case";
import { UserRepository } from "../../user.repository";
import { ResetPasswordController } from "./controller";

const userRepository: IUserRepository =  new UserRepository();
const resetPasswordUseCase = new ResetPasswordUseCase(userRepository);
const resetPasswordController = new ResetPasswordController(resetPasswordUseCase);

export { resetPasswordController };