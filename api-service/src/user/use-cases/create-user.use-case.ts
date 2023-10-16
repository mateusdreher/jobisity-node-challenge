import { CustomError } from "../../utils/error";
import { IUserRepository, Role, IUseCase, LoginDTO, RegisterUserDTO } from "../domain/interfaces";
import { User } from "../domain/user";
import { PasswordUtil } from "../../utils/password";

export class CreateUserUseCase implements IUseCase<RegisterUserDTO, LoginDTO> {
	private readonly userRepository: IUserRepository;

	constructor (userRepository: IUserRepository){
		this.userRepository = userRepository
	}

	async execute(params: RegisterUserDTO): Promise<LoginDTO> {
		try {
			if (!this.isValidRole(params.role)) {
				throw new CustomError('Role invalid', 'UnprocessableEntity')
			}

			const userAlreadyExists = await this.userRepository.getByEmail(params.email);

			if(userAlreadyExists) {
				throw new CustomError('Already exists an user with this email', 'Conflict');
			}

			let alreadyExistsUserWithUsername = true;
			let username = '';
			while (alreadyExistsUserWithUsername) {
				username = this.generateUserName(params.email);
				const user = await this.userRepository.getByUsername(username);

				if (!user) {
					alreadyExistsUserWithUsername = false;
				}
			}
			
			const {password, hashedPassword} = PasswordUtil.generatePassword()
			const user = new User({
				username,
				password: hashedPassword,
				email: params.email,
				role: params.role as Role
			});

			this.userRepository.create(user);

			return {
				email: params.email,
				password
			}
		} catch(error) {
			throw error;
		}
	}

	generateUserName(email: string): string {
		const name = email.split("@")[0].trim();
		let result = '';
		for (let i = 0; i < 5; i++) {
			result += Math.floor(Math.random() * 10);
		}
		
		
		return `${name}-${result}`;
	}


	isValidRole(role: string): boolean {
		return Object.values(Role).includes(role as Role);
	}

	
}