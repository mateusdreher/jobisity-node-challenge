import { IUserRepository, IUseCase, StatsDTO } from "../domain/interfaces";

export class GetStatsUseCase implements IUseCase<undefined, StatsDTO[]> {
	private userRepository: IUserRepository;

	constructor (repository: IUserRepository) {
		this.userRepository = repository;
	}

	async execute(): Promise<StatsDTO[]> {
		try {
			return await this.userRepository.getStats();
			
		} catch(error) {
			throw error;
		}	
	}
}