import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';
import { AppDataSource } from "./database/data-source"

import {router} from './routes';

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

// Middleware for errors treatment
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
);

AppDataSource.initialize().then(async () => {
  console.log('Database connected')
  app.listen(port, () => console.log('Server is running'));
}).catch(error => console.log(error))

