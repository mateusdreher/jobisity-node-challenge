import { app } from "./app";
import * as dotenv from 'dotenv';
import { Database } from "./database";
import http from 'http';

dotenv.config();
const PORT = process.env.PORT || '3005';
const server = http.createServer(app);
Database.connect(process.env.MONGO_DB_URL ?? '')
bootstrap();

function bootstrap(newPort?: number) {
	server.listen(newPort ?? PORT,  () => {
		console.log(`Server listening at ${PORT}`);
	});

	server.on('error', handleError)
}

function handleError(error: any) {
	if (error.syscall !== 'listen') {
	  throw error;
	}
	
	if (error.code === 'EACCES') {
		console.error(PORT + ' requires elevated privileges');
		process.exit(1);
	}
	if (error.code === 'EADDRINUSE') {
		console.error(PORT + ' is already in use');
		process.exit(1);
	}

	process.exit(1);
  }