import crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface Password {
	hashedPassword: string;
	password: string;
}

export class PasswordUtil {

	static getSalt(): string {
		return process.env.SALT ?? '10' 
	}

	static getSecretJWT(): string {
		return process.env.SECRET ?? 'SECRET_API_JOBISTY'
	}

	static generatePassword(): Password {
		const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
		let password = '';
	  
		for (let i = 0; i < 12; i++) {
		  const randomIndex = Math.floor(Math.random() * charset.length);
		  password += charset.charAt(randomIndex);
		}

		const hashedPassword = this.hashPassword(password);

		return {
			password,
			hashedPassword
		}
		
	}


	static hashPassword(password: string): string {
		const salt = this.getSalt();
		const hash = crypto
			.pbkdf2Sync(password, salt, 10000, 64, 'sha256')
			.toString('hex');
		return hash;
	}

	static validatePassword(password: string, storedHash: string): boolean {
		const salt = this.getSalt();
		const hashToCheck = crypto
		  .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
		  .toString('hex');
		
		return hashToCheck === storedHash;
	  }

	  static generateJWT(userId: string, userRole: string) {
		return jwt.sign({userId, userRole}, this.getSecretJWT(), {expiresIn: '1h'})
	  }
}