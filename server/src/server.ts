import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { AppDataSource } from "./database/data-source"

import {router} from './routes';

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

// Middleware de tratamento de erros
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
  app.listen(3000, () => console.log('Server is running on port 3000'));
})

