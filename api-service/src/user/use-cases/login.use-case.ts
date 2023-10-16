import { CustomError } from "../../utils/error";
import { IUserRepository, IUseCase, LoginDTO } from "../domain/interfaces";
import { PasswordUtil } from "../../utils/password";

export class LoginUseCase implements IUseCase<LoginDTO, string> {
	private readonly userRepository: IUserRepository;
	constructor (repository: IUserRepository) {
		this.userRepository = repository;
	}

	async execute(params: LoginDTO): Promise<string> {
		try {
			const user = await this.userRepository.getByEmail(params.email);
			if (!user || !user._id) {
				throw new CustomError('User not found with this email', 'NotFound');
			}

			const isPasswordValid = PasswordUtil.validatePassword(params.password, user.password);

			if(!isPasswordValid) {
				throw new CustomError('Invalid credentials', 'Unauthorized');
			}

			return PasswordUtil.generateJWT(user._id, user.role);

		} catch(error) {
			throw error;
		}
	}
}