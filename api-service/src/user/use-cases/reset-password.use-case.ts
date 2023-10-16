import { CustomError } from "../../utils/error";
import { IUserRepository, IUseCase, LoginDTO } from "../domain/interfaces";
import { PasswordUtil } from "../../utils/password";
import { EmailUtil } from "../../utils/email";

export class ResetPasswordUseCase implements IUseCase<string, string> {
	private readonly userRepository: IUserRepository;
	constructor (repository: IUserRepository) {
		this.userRepository = repository;
	}

	async execute(email: string): Promise<string> {
		try {
			const user = await this.userRepository.getByEmail(email);
			if (!user || !user._id) {
				throw new CustomError('User not found with this email', 'NotFound');
			}

			const {password, hashedPassword} = PasswordUtil.generatePassword();

			this.userRepository.updateUserPassword(email, hashedPassword);

			return EmailUtil.sendNewPasswordEmail(email, password);

		} catch(error) {
			throw error;
		}
	}
}