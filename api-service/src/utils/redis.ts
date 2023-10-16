import Redis from 'ioredis';
import { CustomError } from './error';

export class RedisUtil {
	private static redis = new Redis({
		host: 'redis-logs-user',
		port: 6379
	});
	
	static async logError(location: string, errorMessage: string, stack: string) {
		const timestamp = new Date().toISOString();

		try {
			await this.redis.rpush('error_logs', `[${timestamp}]-($${location})-(${errorMessage}): ${stack}`)
		} catch(error) {
			throw new CustomError('Error on saving error logs', 'InternalServerError')
		}
	}
}