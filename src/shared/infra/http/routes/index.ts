import { sessionsRouter } from '@modules/account/infra/http/routes/sessions.routes';
import { usersRouter } from '@modules/user/infra/http/routes/users.routes';
import express from 'express';

export const routes = express.Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
