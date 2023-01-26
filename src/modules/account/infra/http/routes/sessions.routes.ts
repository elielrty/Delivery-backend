import { AuthenticateUserController } from '@modules/account/services/AuthenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/account/services/RefreshToken/RefreshTokenController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const sessionsRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post(
  '/authenticate',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false },
  ),
  authenticateUserController.handle,
);

sessionsRouter.post(
  '/refresh-token',
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().required(),
    },
  }),
  refreshTokenController.handle,
);

export { sessionsRouter };
