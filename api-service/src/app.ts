import { userRouter } from "./user/routes";
import express from 'express';
import { error404Handler, errorHandler } from "./middlewares/error.middleware";
import { healthRouter } from "./routes";
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../swagger.json'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/', healthRouter);
app.use('/users', userRouter);



app.use(errorHandler);
app.use(error404Handler);
export { app }
