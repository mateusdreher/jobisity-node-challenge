import express from 'express';
import { error404Handler, errorHandler } from "./src/middlewares/error.middleware";
import { stockRouter } from './src/stock/routes';

const indexRouter = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/stock', stockRouter)


app.use(errorHandler);
app.use(error404Handler);
export { app }
