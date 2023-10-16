import nodemailer from 'nodemailer';
import { CustomError } from './error';

export class EmailUtil {
	private static transporter = nodemailer.createTransport({
		host: 'smtp.zoho.com',
		port: 465,
		secure: true,
		auth: {
		  user: 'contato@mateusdreher.com.br',
		  pass: 'Xe7bbU74ATUj'
		}
	  });
	 
	private static mailOptions = {
		from: 'contato@mateusdreher.com.br',
		to: '',
		subject: '',
		html: ''
	  };
	  
	  

	static async sendNewPasswordEmail(email: string, password: string): Promise<string> {
		this.mailOptions.to = email;
		this.mailOptions.subject = 'Here is your new password to jobsity stock consult api';
		this.mailOptions.html = `<p>${password}<p>`
		try {
			const ready = await this.transporter.verify();

			if (ready) {
				await this.transporter.sendMail(this.mailOptions);
			}

			return 'Your password has been successfully reset and a new one has been sent to your email address.'
		} catch (error) {
			throw new CustomError('Error at send email', 'InternalServerError');
		}
	}
}