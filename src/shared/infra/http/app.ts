import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import '../../container';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import pg from 'pg';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/error/AppError';

import swaggerFile from '../../../swagger.json';
import { routes } from './routes';

// Sets any date coming from database to Brazil timezone
pg.types.setTypeParser(1114, stringValue => new Date(`${stringValue}+0000`));

export const app = express();

app.use(express.json());
app.use(cors());

app.use(
  `/api/${process.env.API_VERSION || 'v1'}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile),
);

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Delivery API' });
});

app.use(`/api/${process.env.API_VERSION || 'v1'}`, routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    // if (isCelebrateError(error)) {
    //   // const errors = error.details.get('body').details;

    //   // let message = 'Campos com dados inválidos: ';

    //   // errors.forEach(err => {
    //   //   message += err.context.key;
    //   // });

    //   return response.status(400).json({
    //     status: 'error',
    //     message: 'Dados inválidos!',
    //   });
    // }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: `Erro interno do servidor! - ${error.message}`,
    });
  },
);
